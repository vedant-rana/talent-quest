$(function () {

    $('.owl-carousel-review').owlCarousel({
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        nav: false
    });

    $('.owl-carousel--company').owlCarousel({
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1500,
        loop: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                autoHeight: true
            },
            768: {
                autoHeight: false
            }
        }
    });

    var owlProject = $('.owl-carousel-project');

    owlProject.owlCarousel({
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 700,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            768: {
                items: 2,
                margin: 30
            },
            900: {
                items: 3,
                margin: 50
            }
        }
    });

    var owlClient = $('.owl-carousel-client');

    owlClient.owlCarousel({
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 700,
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            768: {
                items: 2,
                margin: 30
            },
            900: {
                items: 3,
                margin: 50
            }
        }
    });

    function set_owl_center() {
        owlProject.find('.active').removeClass('owl-center');
        setTimeout(function () {
            owlProject.find('.active').each(function (i) {
                if (i === 1) $(this).addClass('owl-center');
            });
        }, 80);
        owlClient.find('.active').removeClass('owl-center');
        setTimeout(function () {
            owlClient.find('.active').each(function (i) {
                if (i === 1) $(this).addClass('owl-center');
            });
        }, 80);
    }
    set_owl_center();

    owlProject.on('changed.owl.carousel', function () {
        set_owl_center();
    });

    owlClient.on('changed.owl.carousel', function () {
        set_owl_center();
    });
});

$(function () {

    var header = $('.header');

    function scroll() {
        var top = $(window).scrollTop();
        if (top > 10) {
            header.addClass('header--fixed');
        } else {
            header.removeClass('header--fixed');
        }
    }
    scroll();

    var btnScroll = $('.js-scroll');

    function scrollBottom() {
        var windowTop = $(window).scrollTop();
        var company = $('.about--company');
        var companyHeight = company.innerHeight() - 180;

        if (windowTop >= companyHeight) {
            btnScroll.hide();
        }
        else if (windowTop <= 10) {
            btnScroll.show();
        }
    }
    scrollBottom();

    $(window).on('scroll', function () {
        scroll();
        scrollBottom();
    });

    btnScroll.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('.carousel').offset().top - 180
        }, 700);
    });
});
$('.js-toggleNavMobile').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.header').find('.header__nav').toggleClass('header__nav--open');
});
(function () {
    'use strict';

    /******** App validation ********/
    var Validation = (function (form) {

        var requiredError = "required-error",
            emailError = "email-error",
            formInvalidError = "form-invalid-error";

        var EmailClass = '.js-validEmail',
            RequiredClass = '.js-validRequired',
            SubmitBtn = '.js-submitBtn',
            FormClass = '.js-validForm',
            SubmitBtnReg = '.js-btn-reg';

        var noSpacesClass = '.js-noSpaces',
            numOnlyClass = '.js-numOnly';

        var HiddenClassName = '_hidden';

        function _validateRequiredInputs(form, input) {
            var _requiredInputs = form.find(RequiredClass);

            if (input && input.length) {
                _requiredInputs = input;
            }

            if (!_requiredInputs.length) {  // if there is no such inputs exit func
                return;
            }

            $(_requiredInputs).each(function () {
                var $this = $(this);

                if ($this.val().length > 0) {
                    $this.removeClass(requiredError);
                } else {
                    if ($this.hasClass(HiddenClassName)) {
                        $this.removeClass(requiredError);
                    } else {
                        $this.addClass(requiredError);
                    }
                }
            });
        }


        function _validateEmail(form) {
            var _emailInputs = form.find(EmailClass);

            if (!_emailInputs.length) {
                return;
            } // if there is no such inputs exit func

            if (_emailInputs.val().length > 0) {
                if (_isEmail(_emailInputs)) {
                    _emailInputs.removeClass(emailError);
                } else {
                    _emailInputs.addClass(emailError);
                }
            }

            if (_emailInputs.hasClass(requiredError)) {
                _emailInputs.removeClass(emailError);
            }

            //compare Email with regExp
            function _isEmail(emailInput) {
                var _regExp = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                    _result = _regExp.test(emailInput.val());

                return _result;
            }

        }


        function _isFormValid(form) {
            _validateRequiredInputs(form);
            _validateEmail(form);

            //check does form has errors
            if (form.find('.' + emailError).length ||
                form.find('.' + requiredError).length) {

                form.addClass(formInvalidError);
                return false;
            } else {
                form.removeClass(formInvalidError);
                return true;
            }
        }

        function _bindEvents() {
            $(document)
                .on('click.Validation', SubmitBtn, function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        form = $this.closest(FormClass);


                    if (_isFormValid(form)) {
                        var mail = {
                            'Name': $('input[name = Name]').val(),
                            'Email': $('input[name = Email]').val(),
                            'PhoneNumber': $('input[name = PhoneNumber]').val(),
                            'Budget': $('input[name = Budget]').val(),
                            'Message': $('textarea[name = Message]').val(),
                            'Captcha': grecaptcha.getResponse()
                        };
                        $.ajax({
                            type: "POST",
                            url: "/Contacts/SendEmail",
                            data: mail,
                            cache: false,
                            async: true,
                            success: function (result) {

                                $('#successfield').show();
                                $('#contactsfield').hide();
                            }, error: function (result) {

                            }
                        });
                        console.log("form is sent");




                    } else {
                        console.log("form is invalid");
                    }
                })

                .on('click.Validation', SubmitBtnReg, function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        form = $this.closest('#car-wrap').find(FormClass);

                    if (_isFormValid(form)) {
                        console.log("form is valid");
                    } else {
                        console.log("form is invalid");
                    }
                })

                .on('blur', RequiredClass, function () {
                    var $this = $(this),
                        form = $this.closest(FormClass);

                    _validateRequiredInputs(form, $this);
                })
                .on('blur', EmailClass, function () {
                    var $this = $(this),
                        form = $this.closest(FormClass);

                    _validateEmail(form, $this);
                })
        }

        function _inputNumsOnly() {
            $(document)
                .on('input', numOnlyClass, function () {
                    var input = $(this),
                        currentValue = input.val();

                    if (input.val() && !input.val().split('')[input.val().length - 1].match(/^[0-9]/g)) {
                        input.val(currentValue.split('').slice(0, -1).join(''));
                    }
                })
        }
        function _inputNoSpaces() {
            $(document)
                .on('input', noSpacesClass, function () {
                    var $this = $(this);

                    $this.val($this.val().replace(/\s/g, ''))
                });
        }

        return {
            init: function () {
                _bindEvents();
                _inputNumsOnly();
                _inputNoSpaces();
            },
            isFormValid: _isFormValid
        };
    }());

    Validation.init();

}());
