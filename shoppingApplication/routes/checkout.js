var express                 = require('express');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');
var paypal 			        = require('paypal-rest-sdk');

//Paypal configuration
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AeII0XFRjQu4i4NGwoFxC0CwDdDtQQ_TiDKL-ZUhNJsjWhDDUvbC3bFeGpIOkiYIo9BLjNJH3fW4ZlZf',
  'client_secret': 'ECrVfpnHwP-aKXJr2-c4Wwp6pmlUEC2eKlQP477sezgsZ5td85flBpdJbfOmT7_hndvUiADArwm7N8CD'
});

// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice.toFixed(2)  
    cart.totalPrice = cart.totalPrice.toFixed(2) 
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

//Buyer account: szhyj1390-buyer@gmail.com
//Buyer password: 12345678

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);    
    var totalPrice = cart.totalPrice.toFixed(2)  
    cart.totalPrice = cart.totalPrice.toFixed(2) 
	
    //var didPaymentSucceed = Math.random()
	
	// Build PayPal payment request
	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
		"return_url":"http://localhost:3000/checkout/checkout-success",
		"cancel_url":"http://localhost:3000/checkout/checkout-cancel"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item",
					"sku": "item",
					"price": totalPrice,
					"currency": "CAD",
					"quantity": 1
				}]
			},
			"amount": {
				"currency": "CAD",
				"total": totalPrice 
			},
			"description": "This is the payment description."
		}]
	};
	//console.log("1");
	
	paypal.payment.create(create_payment_json, function(error, payment){
	  var links = {};
	  if(error){
		console.error(JSON.stringify(error));
	  } else {
		// Capture HATEOAS links
		payment.links.forEach(function(linkObj){
		  links[linkObj.rel] = {
			href: linkObj.href,
			method: linkObj.method
		  };
		})

		// If redirect url present, redirect user
		if (links.hasOwnProperty('approval_url')){
		  //REDIRECT USER TO links['approval_url'].href
		  res.redirect(links.approval_url.href);
		} else {
		  console.error('no redirect URI present');
		}
	  }
	});
	
    //FOR NOW
	/*
    if (didPaymentSucceed >= 0.5){
       //either of these two could work
       //res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-success')
     }
    else {
       //either of these two could work
       //res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
       res.redirect(302, '/checkout/checkout-cancel')
    }
	*/
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice.toFixed(2)  
    cart.totalPrice = cart.totalPrice.toFixed(2)
    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;
