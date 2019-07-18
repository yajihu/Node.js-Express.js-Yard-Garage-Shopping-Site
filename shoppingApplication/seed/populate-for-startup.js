var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

var products = [
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/1221765?$pdp-placeholder-desktop$',
        title       : 'Fancy Feast® Paté Cat Food',
        description : 'Your cat will love the great seafood flavour of Fancy Feast Pate Salmon Feast Cat Food.',
        price       : 0.69,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5219391?$pdp-placeholder-desktop$',
        title       : 'Authority® Adult Cat Food - Flaked',
        description : 'Your furry friend will purr with delight when you serve her this Authority Flaked Chicken Dinner in Sauce Cat Food, which features a delectable chicken flavour and a tasty sauce to tempt her taste buds. ',
        price       : 1.49,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/1211687?$pdp-placeholder-desktop$',
        title       : 'Cesar® Entrées Adult Dog Food',
        description : 'Your dog will love the patÃ©-style loaf featuring the delectable tastes of chicken and liver smothered in a delicious sauce.',
        price       : 1.99,
        type        : 2
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5255885?$pdp-placeholder-desktop$',
        title       : 'Dentley® Rawhide Knotted Bones Small Dog Treat - Chicken',
        description : 'These treats offer great chicken flavour and hours of chewing pleasure for your pup, and as he chews they help to reduce plaque and tartar for improved dental health. ',
        price       : 19.99,
        type        : 2
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5210970?$pdp-placeholder-desktop$',
        title       : 'Temptations™ Mix Ups Cat Treats',
        description : 'WHISKASTEMPTATIONS treats have a scrumptious, crunchy outer shell with an irresistibly soft, tasty centre cats will do anything for.',
        price       : 1.59,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5277723?$pdp-placeholder-desktop$',
        title       : 'Top Paw® Holy Guacamole Pepper Dog Toy - Plush, Squeaker',
        description : 'Keeping your dog entertained and engaged is easy with this Top Paw Plush Pepper Dog Toy. This fun toy comes in the shape of a spicy pepper, and makes play time fun with the playful squeaking sounds it makes when squeezed.',
        price       : 6.99,
        type        : 2
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5277739?$pdp-placeholder-desktop$',
        title       : 'Top Paw® Holy Guacamole Lime Flattie Dog Toy - Crinkle, Squeaker',
        description : 'Keeping your dog entertained and engaged is easy with this Top Paw Flattie Lime Dog Toy. This fun toy comes in the shape of a delicious lime, and makes play time fun with the playful squeaking and crinkling sounds it makes when squeezed and touched. ',
        price       : 4.99,
        type        : 2
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5173309?$pdp-placeholder-desktop$',
        title       : 'Grreat Choice® Leopard Print Ball Teaser Cat Toy',
        description : 'Cats go wild for this interactive teaser! The best part is they get to play with you! Tempt your cats instincts in the air, on the ground, or through an obstacle course as you bring this teaser to life.',
        price       : 5.49,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5269362?$pdp-placeholder-desktop$',
        title       : 'ED Ellen DeGeneres Owl Cat Toys - 2 Pack',
        description : 'Your cat will love the time she spends with these ED Ellen DeGeneres Core Owl Cat Toys. These fun toys are made with love, and are perfect for cuddling, swatting ',
        price       : 7.49,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5218601?$pdp-placeholder-desktop$',
        title       : 'Nature Miracle® Litter Box Wipes',
        description : 'Nature Miracle Litter Box Wipes add the convenience of an extra thick wipe to a best selling formula. The quilted texture, with grip dot technology, easily lifts stuck-on debris while the deodorizing formula eliminates odours. ',
        price       : 11.49,
        type        : 1
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/PetSmart/5160711?$pdp-placeholder-desktop$',
        title       : 'Top Paw® Puppy Shampoo',
        description : 'A vitamin-enriched conditioner with aloe for a healthy skin and coat. Suited for dogs eight weeks of age and older. ',
        price       : 17.99,
        type        : 2
    })


];

for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result) {
        if (i === products.length - 1){
            exit();
        }
    });
}

var newUser = new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
});
var newUser2 = new User({
    username    : 'jillian@admin.com',
    password    : 'jillian',
    fullname    : 'Yejing Li',
    admin       : true
});
var newUser3 = new User({
    username    : 'yajihu@admin.com',
    password    : 'yajihu',
    fullname    : 'Yaji Hu',
    admin       : true
});

User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);

});
User.createUser(newUser2, function(err, user){
    if(err) throw err;
    console.log(user);

});
User.createUser(newUser3, function(err, user){
    if(err) throw err;
    console.log(user);

});

function exit() {
    mongoose.disconnect();
}
