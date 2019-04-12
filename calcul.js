var id = $(".id")
var image = $(".image-produit");
var nom = $(".nom");
var prix = $(".prix");
var poids = $(".poids");
var livraison = $(".livraison");
var douane = $(".douane");
var service = $(".service");
var livraison_vendeur = $(".livraison-vendeur");
var email = $(".email");
var tel = $(".tel");
var addresse = $(".addresse");
var total = $(".total");



$(document).ready(() => {
     url = "https://api.comparez.co/api/v1/ads/242/"
     fetch(url)
          .then((resp) => resp.json()) // Transform the data into json
          .then(function (data) {
               id.val(data.id)
               image.attr("src", data.image);
               nom.text(data.name);
               prix.text(data.price)
               poids.text(data.size + " " + data.unit)
               livraison.text(data.delivery_costs_per_kilo + " CFA")
               douane.text(data.delivery_charges_territory + " CFA")
               service.text(data.service_charge + " CFA")
               livraison_vendeur.text(data.shipping_costs_of_seller + " CFA")
               total.text("")
          })
})


var payer = () => {
     var _id = id.val()
     var _email = email.val()
     var _tel = tel.val()
     var _addresse = addresse.val()
     var amount_due = total.val().replace(" CFA", "")

     url = "https://api.comparez.co/api/v1/get_payexpress_token/?ad_id=" + _id +
          "&cancel_url=www.google.com&success_url=sn.comparez.co&user_phone=" + _tel +
          "&user_email=" + _email + "&delivery_address=" + _addresse + "&amount_due=" + amount_due;
     fetch(url)
          .then((resp) => resp.json()) // Transform the data into json
          .then(function (data) {
               console.log(data)
          })
}
