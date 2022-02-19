const stripe = require('stripe')("sk_test_51KUJs3J2BxS3GLbapBRZ7nXHj9ZauyDyeoyM3uhnAcYi62UYpNv68tUB6J3QQC7VgWjJfZxe0iAwhMExwXM3QheQ006avg7F4P");
const uuid = require('uuid')

exports.paymentSession = (req,res) => {
  console.log("Hello in payment", req)
  try {
    const {amount=0, token} = req.body;
    const idempotencyKey = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

    return stripe.customers.create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create({
        amount: amount*100,
        currency: "usd",
        customer: customer
      }, {idempotencyKey})
    })
    .then(result => 
      res.status(200).json(result)
    ).catch(err => {
      res.status(400).json({
        erroe: err.message
      })
    })
    
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}