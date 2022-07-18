function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


theme_custom.clickEvent = function(){
    //pdp colour text change
    $(document).on('change','.swatch_variant',function(){
      var variant_color_name = $(this).val();
      console.log('variant_color_name',variant_color_name);
      $('.selected-swatch-title').text(variant_color_name);
    });
  //predictive-search-click
  $(document).click('.predictive-custom-collection',function(){
    $('.predictive-custom-collection').css('display','block');
    // $('.header-inner-main').removeClass('No-background-header');
  });
 
  $(document).on('click','.thumbnail-list .thumbnail',function (e) {
    e.preventDefault();
    $(this).closest('.thumbnail-list').find('.thumbnail-list__item').removeClass('active');
    $(this).closest('.thumbnail-list__item').addClass('active');
     var thumbnailid = $(this).closest('.thumbnail-list__item').attr('data-media-id');
     console.log('thumbnailid',thumbnailid);  

     $('html, body').animate({
    scrollTop: $('li[larg-img ="'+thumbnailid+'"]').offset().top - 170 - $('.header-wrapper').height(),
  }),
  500,'linear'
});

$(document).on('click','.remove_product_on_mobile',function(){
  $('.cstm_remove_section').hide();
  $(this).closest('.cart-item').next('.cstm_remove_section').show();
 });
  
  $('.order_history_show_btn').click(function(){
    $('.account_order_page').hide();
    $('.order_history_show').show();
  });

  /* Product Swatches 
    card-product.liquid */
  $(document).on("click", ".swatchelement", function (e) {
    e.preventDefault();
    $('.swatchelement').removeClass('swatch-border');
    $(this).addClass('swatch-border');
    var dataVarImg = $(this).attr("data-var-img");
    if (dataVarImg != "") {
      $(this).closest(".grid__item").find(".product_card_media img.motion-reduce").attr("srcset", dataVarImg);
    }
    var dataVarPrice = $(this).attr("data-var-price");
    var dataVarComparePrice = $(this).attr("data-var-compare-price");
    $(this).closest(".grid__item").find(".variant_price__item").text(` ${dataVarPrice} `);
    $(this).closest(".grid__item").find(".variant_compare_price__item").text(` ${dataVarComparePrice} `);
    if(dataVarComparePrice == ''){
      $(this).closest(".grid__item").find(".variant_price__item").css('color', '#52848D');
    }else{
      $(this).closest(".grid__item").find(".variant_price__item").css('color', '#ce0000');
    }
  });
  /* main-collection-product-grid.liquid */
  $(document).on("click", ".collection-products-load-more-link", function (e) {
    e.preventDefault();
    var getnextPageLink = $(this).attr("href");
    $.ajax({
      dataType: "html",
      url: getnextPageLink,
      type: 'GET',
      success: function (response) {
        $(".collection-get-product #product-grid").append(
          $(response).find("#product-grid").html()
        );
        if ($(response).find(".collection-products-load-more-main a").length > 0) {
          $(".collection-products-load-more-main a").attr(
            "href",
            $(response).find(".collection-products-load-more-main a").attr("href")
          );
          $(".collection-products-load-more-main").show();
        } else {
          $(".collection-products-load-more-main").hide();
        }
      },
    });
  });
  /* main-collection-product-grid (facets.liquid) */
  $(document).on("click", ".collect_filter_ul .collect_filter_list", function (e) {
    var dataIndexFilter = $(this).attr("data-index-filter");
    $(`.mobile-facets__details[data-index="${dataIndexFilter}"]`).find('.mobile-facets__summary').trigger('click');
  });
  // filter close
  $(".mobile-facets__close").click(function(){
    $(".mobile-facets__disclosure").removeAttr("open");
    $(".mobile-facets__disclosure").removeClass("menu-opening");
    $("html,body").removeClass("overflow-hidden-mobile");
  });
  
  //addresses.liquid
  $('.edit__cust_btn').click(function(){
    var addressId = $(this).attr('data-id');
    if($(`#${addressId}`).is(":visible")){
      $(`#${addressId}`).hide();
    } else{
      $('.editable__address').hide();
      $(`#${addressId}`).show();
    }
  });    
  //close edit form
  $('.edit_address_close_btn').click(function(){
    $('.editable__address').hide();
  });


}


// theme_custom.formValidation
theme_custom.formValidation = function () {
  $(".form_email").bind("keypress keyup keydown", function (e) {
    if (e.which == 32) {
      return false;
    }
    // if ($(this).closest(".form-wrap").find(".form-error.active").length > 0) {
    //   $(this).closest(".form-wrap").find(".form-error.active").removeClass("active");
    // }
    theme_custom.emailValidation($(this));
  });
  // $(".form_field").bind("keypress keyup keydown", function (e) {
  //   if (e.which == 32) {
  //     return false;
  //   }
  //   theme_custom.fieldValidation($(this));
  // });

  $(".form_address").on("keypress keyup keydown", function(e) {
    if ($(this).val().length > 254) {
      return false;
    }
  });

  $('.form_name').bind("keyup", function (e) {
    theme_custom.nameValidation($(this));
  });

  $(".form_phone").bind("keypress keyup keydown", function(e) {
    theme_custom.phoneValidation($(this));
  });

  $(".form_email").bind("keypress keyup keydown", function(e) {
    theme_custom.emailValidation($(this));
  });
  
  $(".form_address").bind("keypress keyup keydown", function(e) {
    theme_custom.fieldValidation($(this));
  });
  
  // $(".form_word").on('keypress keyup keydown', function(e) {
  //   theme_custom.fieldtextareaValidation($(this));
  // }); 

  $(".form_zip").on('keypress keyup keydown', function(e) {
    theme_custom.zipValidation($(this));
   }); 

};

// theme_custom.nameValidation
theme_custom.nameValidation = function ($this) {
  var count = 0;
  var parent = $this.closest(".form-wrap");
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = $this.val();
  if ($this.val() == "" || $.trim($this.val()) == '') {
    parent.find('.form-error').text('This field is required').addClass("active");
    count = 1;
  } else if ($this.length > 0) {
    if ($this.val().length > 49) {
      if ($this.val().length > 49) {
        parent.find(".form-error").text('First name is too long (maximum is 50 characters)').addClass("active");
      } else {
        parent.find(".form-error").removeClass("active");
      }
    } else {
      parent.find(".form-error").removeClass("active");
      if (regex.test(str)) {
        parent.find(".form-error").removeClass("active");
      } else {
        parent.find(".form-error").text('Please enter Alphabets').addClass("active");
        count = 1;
      }
    }
  } else {
    parent.find(".form-error").removeClass("active");
  }
  return count;
}

// theme_custom.fieldValidation
theme_custom.fieldValidation = function ($this) {
  var count = 0;
  var parent = $this.closest(".form-wrap");
  var passwordMinlength = parseInt($this.attr("minlength"));
  var passwordMaxlength = parseInt($this.attr("maxlength"));
  
  if ($this.val() == "" || $.trim($this.val()) == '') {
    parent.find('.form-error').text('This field is required').addClass("active");
    count = 1;
  } else {
    if ($this.val().length > passwordMaxlength || $this.val().length < passwordMinlength) {
      parent.find('.form-error').text('Please enter minimum ' + passwordMinlength + ' & maximum length ' + passwordMaxlength + ' ! ').addClass("active");
      count = 1;
    } else {
      parent.find('.form-error').removeClass("active");
    }
  }
  return count;
  
}

// theme_custom.countryValidation
theme_custom.countryValidation = function($this){
  var count = 0;
  var parent = $this.closest(".form-wrap");
  if ($this.val() == '---') {
    parent.find(".form-error").text('Please select country').addClass("active");
    count = 1;
  }else{
    parent.find(".form-error").removeClass("active");
  }
  return count;
}

// theme_custom.zipValidation
theme_custom.zipValidation = function($this) {
  var count = 0;
  var parent = $this.closest(".form-wrap");
  var numbers = /^[A-Za-z0-9_]+$/;
  let targetEl = $this.val().length;
  if ($this.val() == "" || !$this.val().match(numbers)) {
    parent.find('.form-error').text('Please enter Zipcode').addClass("active");
    count = 1;
  } else {
    if (targetEl < 3) {
      parent.find(".form-error").text('Please enter minimum 3 characters').addClass("active");
      count = 1;
    } else if (targetEl > 8) {
      parent.find(".form-error").text('Please enter maximum 8 characters').addClass("active");
      count = 1;
    } else {
      parent.find(".form-error").removeClass("active");
    }
  }
  return count;
}

// theme_custom.phoneValidation
theme_custom.phoneValidation = function($this) {
  var count = 0;

  var parent = $this.closest(".form-wrap");
  let targetEl = $this.val().length;
  var numbers = /^[0-9]+$/;
  if (!$this.val().match(numbers)) {
    parent.find(".form-error").text('Please enter only number').addClass("active");
    // return false;
    count = 1;
  } else {
    if (targetEl < 9) {
      parent.find(".form-error").text('Please enter minimum 9 characters').addClass("active");
      count = 1;
    } else if (targetEl > 14) {
      parent.find(".form-error").text('Please enter maximum 14 characters').addClass("active");
      count = 1;
    } else {
      parent.find(".form-error").removeClass("active");
    }
  }
  return count;
}

// theme_custom.emailValidation
theme_custom.emailValidation = function ($this) {
  var count = 0;
  var parent = $this.closest(".form-wrap");
  if ($this.val() == "" || $.trim($this.val()) == "") {
    parent
      .find(".form-error")
      .text("This field is required")
      .addClass("active");
    var count = 1;
  } else {
    function ValidateEmail(email) {
      var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return expr.test(email);
    }
    if (!ValidateEmail($this.val())) {
      parent
        .find(".form-error")
        .text("Please enter valid email")
        .addClass("active");
      var count = 1;
    } else {
      parent.find(".form-error").removeClass("active");
    }
  }
  return count;
}

theme_custom.submitEvent = function() {
  $(".popup__newsletter").submit(function(e) {
    var error_count = 0;
    error_count =
      error_count +
      theme_custom.emailValidation($(this).find('[name="contact[email]"]'));
    // var $this = $(this);
    if (error_count > 0) {
      e.preventDefault();
      return false;
    }
  });

  /* addresses.liquid */
  $('.address_form_edit, #address_form_new').submit(function(e) {
    var error_count = 0;
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="address[first_name]"]'));
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="address[last_name]"]'));
    error_count = error_count + theme_custom.fieldValidation($(this).find('[name="address[address1]"]'));
    error_count = error_count + theme_custom.fieldValidation($(this).find('[name="address[address2]"]'));
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="address[city]"]'));
    error_count = error_count + theme_custom.countryValidation($(this).find('[name="address[country]"]'));
    error_count = error_count + theme_custom.zipValidation($(this).find('[name="address[zip]"]'));
    error_count = error_count + theme_custom.phoneValidation($(this).find('[name="address[phone]"]'));
    if (error_count > 0) {
      return false;
    }
  });
  //login submit event
  $('#customer_login').submit(function (e) {
    var error_count = 0;
    error_count = error_count + theme_custom.emailValidation($(this).find('[name="customer[email]"]'));
    error_count = error_count + theme_custom.fieldValidation($(this).find('[name="customer[password]"]'));
    if (error_count > 0) {
      e.preventDefault();
      return false;
    }
  });
  //register submit event
  $('#create_customer').submit(function (e) {
    var error_count = 0;
    error_count = error_count + theme_custom.emailValidation($(this).find('[name="customer[email]"]'));
    error_count = error_count + theme_custom.fieldValidation($(this).find('[name="customer[password]"]'));
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="customer[first_name]"]'));
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="customer[last_name]"]'));
    if (error_count > 0) {
      return false;
    }
  });
  $('#recovery-form-login').submit(function (e) {
    var error_count = 0;
    error_count = error_count + theme_custom.emailValidation($(this).find('#RecoverEmail'));
    if (error_count > 0) {
      return false;
    }
  });
  $('#ContactForm').submit(function (e) {
    var error_count = 0;
    error_count = error_count + theme_custom.nameValidation($(this).find('[name="contact[Name]"]'));
    error_count = error_count + theme_custom.emailValidation($(this).find('[name="contact[email]"]'));
    error_count = error_count + theme_custom.phoneValidation($(this).find('[name="contact[Phone number]"]'));
    error_count = error_count + theme_custom.fieldValidation($(this).find('[name="contact[Comment]"]'));
   
    if (error_count > 0) {
      e.preventDefault()
      return false;
    }
  });
}

//featured-collection.liquid
theme_custom.slick_Sliders = function () {
  $(".featured-collection-slider").slick({
    slidesToScroll: 1,
    dots: false,   
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
  var $slider = $('.featured-collection-slider');
  var $progressBar = $('.progress');
  var $progressBarLabel = $( '.slider__label' );
  
  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
    $progressBar
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc );
    $progressBarLabel.text( calc + '% completed' );
  });

  //collections-slider.liquid
  $(".collection-slider-for").slick({
    slidesToShow: 1,
    // dots: true,
    slidesToScroll: 1,
    prevArrow: "<div class='left-arrow'><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' x='0px' y='0px' viewBox='0 0 32 21.3' style='enable-background:new 0 0 32 21.3;' xml:space='preserve'><style type='text/css'>.st0{fill:#303C42;}.st1{fill:url(#Path_9_00000170251077666054491500000011571302857783398842_);}</style> <g id='icons8-arrow' transform='translate(0 -4)'><path id='Path_8' class='st0' d='M0.2,15.2l10,10c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1 c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10 C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/><linearGradient id='Path_9_00000153706077044497094760000015617416993953407382_' gradientUnits='userSpaceOnUse' x1='-135.5041' y1='143.1656' x2='-134.6791' y2='142.5886' gradientTransform='matrix(-31.9723 0 0 21.334 -4304.1289 -3031.4148)'><stop  offset='0' style='stop-color:#FFFFFF;stop-opacity:0.2'/>  <stop  offset='1' style='stop-color:#FFFFFF;stop-opacity:0'/></linearGradient><path id='Path_9' style='fill:url(#Path_9_00000153706077044497094760000015617416993953407382_);' d='M0.2,15.2l10,10 c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9 c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/></g></svg></div>",
    nextArrow: "<div class='right-arrow'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' viewBox='0 0 32 21.333'> <defs> <linearGradient id='linear-gradient' x1='0.117' y1='0.116' x2='0.942' y2='0.693' gradientUnits='objectBoundingBox'> <stop offset='0' stop-color='#fff' stop-opacity='0.2'/> <stop offset='1' stop-color='#fff' stop-opacity='0'/> </linearGradient> </defs> <g id='icons8-arrow' transform='translate(0 -4)'> <path id='Path_8' data-name='Path 8' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='#303c42'/> <path id='Path_9' data-name='Path 9' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='url(#linear-gradient)'/> </g> </svg></div>",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false
        },
      },
    ]
  });
  $(".cust_coll_for_slider .slide-nav").click(function () {
    var navIndex = $(this).attr("nav-index");
    $(".cust_coll_for_slider .slide-nav").removeClass("nav-active");
    $(this).addClass("nav-active");
    $(".collection-slider-for").slick("slickGoTo", navIndex);
  });
  $(".collection-slider-for").on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(`.cust_coll_for_slider .slide-nav`).removeClass("nav-active");
    $(`.cust_coll_for_slider .slide-nav[nav-index="${nextSlide}"]`).addClass("nav-active");
  });

  //product-slider.liquid
  $(".product-slider-for").slick({
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    adaptiveHeight : true,
    prevArrow: "<div class='left-arrow'><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' x='0px' y='0px' viewBox='0 0 32 21.3' style='enable-background:new 0 0 32 21.3;' xml:space='preserve'><style type='text/css'>.st0{fill:#303C42;}.st1{fill:url(#Path_9_00000170251077666054491500000011571302857783398842_);}</style> <g id='icons8-arrow' transform='translate(0 -4)'><path id='Path_8' class='st0' d='M0.2,15.2l10,10c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1 c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10 C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/><linearGradient id='Path_9_00000153706077044497094760000015617416993953407382_' gradientUnits='userSpaceOnUse' x1='-135.5041' y1='143.1656' x2='-134.6791' y2='142.5886' gradientTransform='matrix(-31.9723 0 0 21.334 -4304.1289 -3031.4148)'><stop  offset='0' style='stop-color:#FFFFFF;stop-opacity:0.2'/>  <stop  offset='1' style='stop-color:#FFFFFF;stop-opacity:0'/></linearGradient><path id='Path_9' style='fill:url(#Path_9_00000153706077044497094760000015617416993953407382_);' d='M0.2,15.2l10,10 c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9 c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/></g></svg></div>",
    nextArrow: "<div class='right-arrow'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' viewBox='0 0 32 21.333'> <defs> <linearGradient id='linear-gradient' x1='0.117' y1='0.116' x2='0.942' y2='0.693' gradientUnits='objectBoundingBox'> <stop offset='0' stop-color='#fff' stop-opacity='0.2'/> <stop offset='1' stop-color='#fff' stop-opacity='0'/> </linearGradient> </defs> <g id='icons8-arrow' transform='translate(0 -4)'> <path id='Path_8' data-name='Path 8' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='#303c42'/> <path id='Path_9' data-name='Path 9' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='url(#linear-gradient)'/> </g> </svg></div>",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        },
      },
    ]
  });
  $(".cust_product_slider .cust-slide-navigation").click(function () {
    var navIndex = $(this).attr("nav-index");
    $(".cust_product_slider .cust-slide-navigation").removeClass("nav-active");
    $(this).addClass("nav-active");
    $(".product-slider-for").slick("slickGoTo", navIndex);
  });
  $(".product-slider-for").on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(`.cust_product_slider .cust-slide-navigation`).removeClass("nav-active");
    $(`.cust_product_slider .cust-slide-navigation[nav-index="${nextSlide}"]`).addClass("nav-active");
  });

  // collection-top-section.liquid
  $('.coll_top_img_slider').slick({
    slidesToShow: 1
  });
  // collection-bottom-common-section.liquid
  $('.coll_bottom_img_slider').slick({
    slidesToShow: 2,
    dots: true,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: "<div class='left-arrow'><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' x='0px' y='0px' viewBox='0 0 32 21.3' style='enable-background:new 0 0 32 21.3;' xml:space='preserve'><style type='text/css'>.st0{fill:#303C42;}.st1{fill:url(#Path_9_00000170251077666054491500000011571302857783398842_);}</style> <g id='icons8-arrow' transform='translate(0 -4)'><path id='Path_8' class='st0' d='M0.2,15.2l10,10c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1 c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10 C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/><linearGradient id='Path_9_00000153706077044497094760000015617416993953407382_' gradientUnits='userSpaceOnUse' x1='-135.5041' y1='143.1656' x2='-134.6791' y2='142.5886' gradientTransform='matrix(-31.9723 0 0 21.334 -4304.1289 -3031.4148)'><stop  offset='0' style='stop-color:#FFFFFF;stop-opacity:0.2'/>  <stop  offset='1' style='stop-color:#FFFFFF;stop-opacity:0'/></linearGradient><path id='Path_9' style='fill:url(#Path_9_00000153706077044497094760000015617416993953407382_);' d='M0.2,15.2l10,10 c0.3,0.3,0.7,0.2,0.9,0c0.2-0.3,0.2-0.7,0-0.9l-8.9-8.9h29.1c0.4,0,0.7-0.3,0.6-0.7c0-0.3-0.3-0.6-0.6-0.6H2.3l8.9-8.9 c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-10,10C0,14.5,0,14.9,0.2,15.2C0.2,15.2,0.2,15.2,0.2,15.2z'/></g></svg></div>",
    nextArrow: "<div class='right-arrow'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='21.333' viewBox='0 0 32 21.333'> <defs> <linearGradient id='linear-gradient' x1='0.117' y1='0.116' x2='0.942' y2='0.693' gradientUnits='objectBoundingBox'> <stop offset='0' stop-color='#fff' stop-opacity='0.2'/> <stop offset='1' stop-color='#fff' stop-opacity='0'/> </linearGradient> </defs> <g id='icons8-arrow' transform='translate(0 -4)'> <path id='Path_8' data-name='Path 8' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='#303c42'/> <path id='Path_9' data-name='Path 9' d='M31.8,14.2l-10-10a.667.667,0,0,0-.943.943L29.724,14H.667a.667.667,0,0,0,0,1.333H29.724L20.862,24.2a.667.667,0,1,0,.943.943l10-10A.666.666,0,0,0,31.8,14.2Z' fill='url(#linear-gradient)'/> </g> </svg></div>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
          variableWidth: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
          variableWidth: false
        }
      }
    ]
  });

}
// https://developers.google.com/youtube/iframe_api_reference
    // global variable for the player
    var player;
    // this function gets called when API is ready to use
    function onYouTubePlayerAPIReady() {
      // create the global player from the specific iframe (#video)
      player = new YT.Player("video", {
        events: {
          // call this function when player is ready to use
          onReady:theme_custom.homevideo
        }
      });
    }

    // Inject YouTube API script
    var tag = document.createElement("script");
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

theme_custom.homevideo =function (){
      // home video
      var Myplayer = player;
      var playButtonClass = '.js-play-button';
      $(document).on('click',playButtonClass,function(e){
        e.stopImmediatePropagation();
        let videoSelector = $(this).closest('.js-play-button-wrap').next(),
            videoObject = videoSelector.get(0);
        $(this).toggleClass('active');
        $(this).closest('.js-play-button-wrap').toggleClass('active');
        $(this).closest('.video_image_banner').toggleClass('video_playing');
        videoSelector.toggleClass('active');
        $(this).closest('.productDescvideo_wrap').toggleClass('video_playing');
        if($(this).hasClass('youtube_video')){
          var videoURL = videoSelector.prop('src');
          if(videoSelector.hasClass('active')){
            videoURL += "&autoplay=1&loop=1";
    //         videoSelector.prop('src',videoURL);
            Myplayer.playVideo();
          }else{
    //         videoURL = videoURL.replace("&autoplay=1", "");
    //         videoSelector.prop('src','');
            videoSelector.prop('src',videoURL);
            Myplayer.pauseVideo();
          }
          console.log('youtube video...');
        }else if($(this).hasClass('vimeo_video')){
          var videoURL = videoSelector.prop('src');
          var player = new Vimeo.Player(videoSelector);
          if(videoSelector.hasClass('active')){
            videoURL += "&autoplay=1&loop=1";
            player.play();
          }else{
            player.pause();
          }
        }else{
          videoObject.paused ? videoObject.play() : videoObject.pause();
        }
      });
}
theme_custom.imagebannerSlider = function (){
  $(document).ready(function () {
    $(".custom-image-slider").slick({
      dots: true,
      infinite: false,
      adaptiveHeight: true,
      dots: true,
      infinite: false,
      speed: 300,
      slidesToScroll: 1
    });
  });
}

theme_custom.init = function () {
  theme_custom.submitEvent();
  //theme_custom.featurecollectionslider();
  //theme_custom.variantPriceChange();
  theme_custom.clickEvent();
  theme_custom.slick_Sliders();
  theme_custom.formValidation();
  theme_custom.imagebannerSlider();
  if ($('#product-video .video_image_banner .js-product-video').length > 0) { 
    theme_custom.homevideo();
  }
};
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    setTimeout(function () {
      $(".newsletter-form__message--success").css("display", "none");
    }, 10000);
    //default login onsubmit attr remove
    if ($(".template-customers-login").length > 0) {
      var loginPageFormSubmit = setInterval(function() {
        if ($("#customer_login[onsubmit]").length > 0) {
          $("#customer_login").removeAttr("onsubmit");
          clearInterval(loginPageFormSubmit);
        }
      }, 100);
    }
    //default register onsubmit attr remove
    if ($(".template-customers-register").length > 0) {
      var registerPageFormSubmit = setInterval(function() {
        if ($("#create_customer[onsubmit]").length > 0) {
          $("#create_customer").removeAttr("onsubmit");
          clearInterval(registerPageFormSubmit);
        }
      }, 100);
    }
    //default  recover onsubmit attr remove
    var loginPageFormSubmitRecover = setInterval(function() {
      if ($("[action='/account/recover'][onsubmit]").length > 0) {
        $("[action='/account/recover']").removeAttr("onsubmit");
        clearInterval(loginPageFormSubmitRecover);
      }
    }, 100);
    //default contact page onsubmist attr remove
    if ($(".template-page-contact").length > 0) {
      var contactPageFormSUbmit = setInterval(function() {
        if ($(".contact-form[onsubmit]").length > 0) {
          $(".contact-form").removeAttr("onsubmit");
          clearInterval(contactPageFormSUbmit);
        }
      }, 100);
    }
  }
});
$(document).ready(function () {
  if (readCookie("newsletter_open") != "true") {
    if (sessionStorage.getItem("popState") != "show") {
      setTimeout(function () {
        $(".welcome-popup-container").show();
      }, 3000);
    }
  }
  $(".close_btn").click(function () {
    $(".welcome-popup-container").hide(); // Now the pop up is hidden.
    sessionStorage.setItem("popState", "show");
  });
  $('.btn_save_for_later').click(function(){
    createCookie('newsletter_open', 'true', 5.787e-5);
    $('.welcome-popup-container').hide(); 
  });
  //about-us read more click
  if($('.template-page-about-us').length > 0 ){
    $(".content-div a").fancybox();
  }
  theme_custom.init();
});
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight();

// header fix
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();

  if (scroll >= 180) {
      $(".header-inner-main").removeClass("No-background-header");
      $(".section-header").addClass("fix-header");
  } else{
      $(".section-header").removeClass("fix-header");
      $(".header-inner-main").addClass("No-background-header");
  }
}); 
// end header fix


