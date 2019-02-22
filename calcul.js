function onReady(callback) {
     var intervalId = window.setInterval(function () {
          if (document.getElementsByTagName('body')[0] !== undefined) {
               window.clearInterval(intervalId);
               callback.call(this);
          }
     }, 3500);
}

function setVisible(selector, visible) {
     document.querySelector(selector).style.display = visible ? 'block' : 'none';
}


function calcul() {
     var select = $("#unit").val()
     console.log(select)
     var valeur = $("#prix").val();
     var poids = $("#poids").val()
     var _frais = $("input[name='frais']")
     var douane = $("input[name='douane']")
     var somme = $("input[name='total']");
     var payments = $(".payments-infos")
     var frais = 0

     if (poids != null && poids != 0 && valeur != null && valeur != 0 && select != "") {
          if (valeur < 66000) {
               var douanes = 20000;
          } else {
               var douanes = valeur / 2;
          }
          if (select == "kg") {
               var frais = poids * 6500;
          } else {
               var frais = poids * 6.5;

          }
          var total = +valeur + +douanes + +frais;
          payments.css("display", "block")
          onReady(function () {

               setVisible('#pay', true);
               setVisible('.lds-roller', false);

          });
          console.log(total)
          _frais.attr("value", frais.toString() + " CFA")
          douane.attr("value", douanes.toString() + " CFA")
          somme.attr("value", total.toString() + " CFA")
          $(".valider").css("display", "block")

     } else {
          $("#item-error").show()
     }




     return total
}

function show() {
     var select = $("#unit").val();
     var valeur = $("#prix").val();
     var poids = $("#poids").val();
     var button = $(".purchase")
     var el = $("#item-error")
     if (el != undefined) {
          el.hide()
     }
     if (select == "" || poids == 0 || valeur == 0) {
          button.css("display", "none")
     } else {
          button.css("display", "block")
     }
}