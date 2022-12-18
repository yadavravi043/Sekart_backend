const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {   res.status(400).json({ error }); }
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((it) => it.product == product);
      let condition,update
      if (item) {
        condition={ user: req.user._id, "cartItems.product": product }
        update={
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        } 
      } 
      else {
        condition={ user: req.user._id }
        update={
          $push: {
            cartItems: req.body.cartItems,
          },
        }
      }
        Cart.findOneAndUpdate(condition,update)
        .exec((error, _cart) => {
          if (error) {
            res.status(400).json({ error });
          }
          if (_cart) {
            res.status(200).json({ cart: _cart });
          }
        });
      }
     else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) {
          res.status(400).json({ error });
        }
        if (cart) {
          res.status(200).json({ cart });
        }
      });
    }
  });
};




































// exports.addItemToCart = (req, res) => {
//   //one user ->one cart and multiple product so check cart exist for that user or not
//   Cart.findOne({ user: req.user._id }).exec((error, cart) => {
//     if (error) {
//       res.status(400).json({ error });
//     }

//     //here if cart already exist then we have to update this by quantity
//     if (cart) {
//       //if item is already in cart then update quantity
//       const product = req.body.cartItems.product;
//       const item = cart.cartItems.find((c) => c.product == product);
//       if (item) {
//         Cart.findOneAndUpdate(
//           { user: req.user._id, "cartItems.product": product },
//           {
//             $set: {
//               //.$ update that particular product only not whole cart
//               "cartItems.$": {
//                 ...req.body.cartItems,
//                 quantity: item.quantity + req.body.cartItems.quantity,
//               },
//             },
//           }
//         ).exec((error, _cart) => {
//           if (error) {
//             res.status(400).json({ error });
//           }
//           if (_cart) {
//             res.status(200).json({ cart: _cart });
//           }
//         });
//       } else {
//         //find first and update
//         Cart.findOneAndUpdate(
//           { user: req.user._id },
//           {
//             $push: {
//               cartItems: req.body.cartItems,
//             },
//           }
//         ).exec((error, _cart) => {
//           if (error) {
//             res.status(400).json({ error });
//           }
//           if (_cart) {
//             res.status(200).json({ cart: _cart });
//           }
//         });
//       }
//     } else {
//       //if cart not found make new one
//       const cart = new Cart({
//         user: req.user._id,
//         cartItems: [req.body.cartItems],
//       });
//       cart.save((error, cart) => {
//         if (error) {
//           res.status(400).json({ error });
//         }
//         if (cart) {
//           res.status(200).json({ cart });
//         }
//       });
//     }
//   });
// };
