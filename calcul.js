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
     window.location.replace = "interface-payment.html?id_product=242"
     $("#primaryModal").modal("toggle")
     var url_string = window.location.href
     var url = new URL(url_string);
     var c = url.searchParams.get("id_product");
     //alert(c);
     url = "https://api.comparez.co/api/v1/ads/" + c
     fetch(url)
          .then((resp) => resp.json()) // Transform the data into json
          .then(function (data) {
               id.val(data.id)
               image.attr("src", data.image);
               nom.text(data.name);
               prix.text(data.price + " CFA")
               poids.text(data.size + " " + data.unit)
               livraison.text(data.delivery_costs_per_kilo + " CFA")
               douane.text(data.delivery_charges_territory + " CFA")
               service.text(data.service_charge + " CFA")
               livraison_vendeur.text(data.shipping_costs_of_seller + " CFA")
               total.text(data.total_delivery_charge)
          })

})


var payer = () => {
     var _id = id.val()
     var _email = email.val()
     var _tel = tel.val()
     var _addresse = addresse.val()
     var amount_due = total.text().replace(" CFA", "")
     var redirect = ""




     if (_email != "" && _tel != "" && _addresse != "") {
          url = "https://api.comparez.co/api/v1/get_payexpress_token/?ad_id=" + _id +
               "&cancel_url=http://localhost/payment/interface.html&success_url=http://sn.comparez.co&user_phone=" + _tel +
               "&user_email=" + _email + "&delivery_address=" + _addresse + "&amount_due=" + amount_due;

          setTimeout(function () {

               $("#primaryModal").modal("toggle")

               var selector = pQuery($(".pay"));
               (new PayExpresse({
                    item_id: 1,
               })).withOption({
                    requestTokenUrl: url,
                    method: 'POST',
                    headers: {
                         "Accept": "application/json"
                    },
                    //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
                    prensentationMode: PayExpresse.OPEN_IN_POPUP,
                    didPopupClosed: function (is_completed, success_url, cancel_url) {
                         if (is_completed === true) {

                              window.location.href = success_url;
                         } else {
                              window.location.href = cancel_url
                         }
                    },
                    willGetToken: function () {
                         console.log("Je me prepare a obtenir un token");
                         selector.prop('disabled', true);
                         //var ads = []


                    },
                    didGetToken: function (token, redirectUrl) {
                         console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                         selector.prop('disabled', false);
                    },
                    didReceiveError: function (error) {
                         alert('erreur inconnu', error.toString());
                         selector.prop('disabled', false);
                    },
                    didReceiveNonSuccessResponse: function (jsonResponse) {
                         console.log('non success response ', jsonResponse);
                         alert(jsonResponse.errors);
                         selector.prop('disabled', false);
                    }
               }).send({
                    pageBackgroundRadianStart: '#0178bc',
                    pageBackgroundRadianEnd: '#00bdda',
                    pageTextPrimaryColor: '#333',
                    paymentFormBackground: '#fff',
                    navControlNextBackgroundRadianStart: '#608d93',
                    navControlNextBackgroundRadianEnd: '#28314e',
                    navControlCancelBackgroundRadianStar: '#28314e',
                    navControlCancelBackgroundRadianEnd: '#608d93',
                    navControlTextColor: '#fff',
                    paymentListItemTextColor: '#555',
                    paymentListItemSelectedBackground: '#eee',
                    commingIconBackgroundRadianStart: '#0178bc',
                    commingIconBackgroundRadianEnd: '#00bdda',
                    commingIconTextColor: '#fff',
                    formInputBackgroundColor: '#eff1f2',
                    formInputBorderTopColor: '#e3e7eb',
                    formInputBorderLeftColor: '#7c7c7c',
                    totalIconBackgroundRadianStart: '#0178bc',
                    totalIconBackgroundRadianEnd: '#00bdda',
                    formLabelTextColor: '#292b2c',
                    alertDialogTextColor: '#333',
                    alertDialogConfirmButtonBackgroundColor: '#0178bc',
                    alertDialogConfirmButtonTextColor: '#fff'
               });
          }, 500)

     } else {
          $(".error").show()
     }



}


var hideError = () => {
     $(".error").hide()
}