<template>
  <div id="services" class="container-fluid text-center">
    <h2>CATEGORY</h2>
    <h4>What we offer</h4>
    <br>
    <div class="row slideanim">
      <router-link to="guitar">
        <div class="col-sm-3 col-xs-3">
          <img :src="guitarPNG" alt="guitarPNG" class="responsive">
          <h4>GUITAR</h4>
        </div>
      </router-link>
      <router-link to="bass">
        <div class="col-sm-3 col-xs-3">
          <img :src="bassPNG" alt="guitarPNG" class="responsive">
          <h4>BASS</h4>
        </div>
      </router-link>
      <router-link to="keyboard">
        <div class="col-sm-3 col-xs-3">
          <img :src="keyboardPNG" alt="guitarPNG" class="responsive">
          <h4>KEYBOARD</h4>
        </div>
      </router-link>
      <router-link to="drumset">
        <div class="col-sm-3 col-xs-3">
          <img :src="drumsetPNG" alt="guitarPNG" class="responsive">
          <h4>DRUM SET</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import guitarPNG from '@/assets/png/guitar.png'
import bassPNG from '@/assets/png/bass.png'
import keyboardPNG from '@/assets/png/keyboard.png'
import drumsetPNG from '@/assets/png/drumset.png'

export default {
  name: 'category',
  data () {
    return {
      guitarPNG,
      bassPNG,
      keyboardPNG,
      drumsetPNG
    }
  }
}

$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault()

      // Store hash
      var hash = this.hash

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash
      })
    } // End if
  })
  $(window).scroll(function () {
    $('.slideanim').each(function () {
      var pos = $(this).offset().top

      var winTop = $(window).scrollTop()
      if (pos < winTop + 600) {
        $(this).addClass('slide')
      }
    })
  })
})
</script>

<style scoped>
  .slideanim {visibility:hidden;}
  .slide {
      animation-name: slide;
      -webkit-animation-name: slide;
      animation-duration: 1s;
      -webkit-animation-duration: 1s;
      visibility: visible;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }

  .col-sm-3 {
    margin: 5px 0px;
    padding: 5px;
  }

  .col-sm-3:hover {
    border: 1px solid #ddd; /* Gray border */
    background-color: whitesmoke;
  }

  .col-xs-3 {
    font-size-adjust: inherit;
  }

  .responsive {
    width: 75%;
    height: auto;
  }

  @media (min-width: 768px) {
    .responsive {
      width: 40%;
      height: auto;
    }
  }

  #services {
    margin-bottom: 10px;
  }
</style>
