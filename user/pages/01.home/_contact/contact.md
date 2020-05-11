---
title: 'Contact'
menu: Top
form:
    name: contact-form
    action: /home
    fields:
        example:
            type: fieldset
            classes: 'contact-info -two-column'
            fields:
                name:
                  id: name
                  label: Name
                  classes: form-control form-control-half
                  placeholder: Enter your name
                  autocomplete: on
                  type: text
                  validate:
                    required: true

                email:
                  id: email
                  classes: form-control form-control-lg
                  label: Email
                  placeholder: Enter your email address
                  type: email
                  validate:
                    rule: email
                    required: true

        message:
          label: Message
          classes: form-control form-control-lg
          size: long
          placeholder: Enter your message
          type: textarea
          validate:
            required: true

    buttons:
        - type: submit
          value: Submit
          classes: btn btn-primary btn-block

    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.from }}"
              - "{{ form.value.email }}"
            subject: "[Feedback] {{ form.value.firstname|e }} {{ form.value.lastname|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Thank you for your feedback!
        - display: thankyou
---

<div class="page" id="contact">
  <div class="container">

    <h3 class="divot">Contact Us</h3>

    <div class="body-wrap">
      <h2>
        more info
        coming in
        summer
        2020. in the
        meantime,
        say hello.
      </h2>
    </div>

  </div>
</div>
