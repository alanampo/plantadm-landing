$(document).ready(function () {
  $(".classynav a,.footer-nav a,.welcome-btn-group a").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const id = $(e.target).attr("href");
    if (id == "inicio") {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: 0,
        },
        700
      );
    } else {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(`.${id}-area`).first().offset().top - 50,
        },
        700
      );
    }
  });

  $("#form-contacto").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    enviarMensaje();
  });

  $(".btn-solicitar").on("click", function (e) {
    const plan = $(e.target).attr("x-plan");
    $("#contact-subject").val(`SOLICITO PLAN ERP ${plan}`);
    $("#message").val(
      `Deseo comenzar a utilizar la plataforma PlantADM y contratar el Plan ERP ${plan}`
    );

    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(`.contact-section`).first().offset().top - 50,
      },
      200
    );

    $("#contact-name").focus();
  });

  window.onresize = () => {
    setTimeout(() => {
      $(".btn-all").first().click();
    }, 1500);
  };
});

function enviarMensaje() {
  const nombre = $("#contact-name").val().replace(/\s/g, " ");
  const email = $("#contact-email").val().replace(/\s/g, "");
  const asunto = $("#contact-subject").val().replace(/\s/g, " ");
  const message = $("#message").val().replace(/\s/g, " ");

  if (!nombre || nombre.length < 4) {
    Swal.fire({
      title: "Ingresa tu Nombre",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (!email || !validEmail(email)) {
    Swal.fire({
      title: "Ingresa un Email válido",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (!asunto || asunto.length < 4) {
    Swal.fire({
      title: "Ingresa el Asunto",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (!message || message.length < 20) {
    Swal.fire({
      title: "Ingresa un mensaje de al menos 20 caracteres",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  $("#btn-submit").prop("disabled", true);

  $.ajax({
    beforeSend: function () {},
    url: "data.php",
    type: "POST",
    data: {
      consulta: "enviar_form_contacto",
      email: email.toLowerCase(),
      nombre: nombre,
      asunto: asunto,
      message: message,
    },
    success: function (x) {
      console.log(x);
      if (x.includes("success")) {
        Swal.fire({
          title: "Enviaste el formulario correctamente!",
          text: "Nos contactaremos contigo en breve.",
          icon: "success",
          confirmButtonText: "OK",
        });
        $("input,textarea").val("");
      } else {
        Swal.fire({
          title: "Ocurrió un error al enviar el formulario",
          icon: "error",
          confirmButtonText: "OK",
        });
        $("#btn-submit").prop("disabled", true);
      }
    },
    error: function (jqXHR, estado, error) {
      Swal.fire({
        title: "Ocurrió un error al enviar el formulario",
        icon: "error",
        confirmButtonText: "OK",
      });
      $("#btn-submit").prop("disabled", true);
    },
  });
}

function validEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
