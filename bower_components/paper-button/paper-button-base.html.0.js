
    Polymer({

      z: 1,

      activeChanged: function() {
        this.super();

        if (this.active) {
          // FIXME: remove when paper-ripple can have a default 'down' state.
          if (!this.lastEvent) {
            var rect = this.getBoundingClientRect();
            this.lastEvent = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            }
          }
          this.$.ripple.downAction(this.lastEvent);
        } else {
          this.$.ripple.upAction();
        }
        this.adjustZ();
      },

      disabledChanged: function() {
        this.super();
        if (this.disabled) {
          this.setAttribute('aria-disabled', '');
        } else {
          this.removeAttribute('aria-disabled');
        }
        this.adjustZ();
      },

      recenteringTouchChanged: function() {
        if (this.$.ripple) {
          this.$.ripple.classList.toggle('recenteringTouch', this.recenteringTouch);
        }
      },

      fillChanged: function() {
        if (this.$.ripple) {
          this.$.ripple.classList.toggle('fill', this.fill);
        }
      },

      adjustZ: function() {
        if (this.active) {
          this.z = 2;
        } else if (this.disabled) {
          this.z = 0;
        } else {
          this.z = 1;
        }
      },

      downAction: function(e) {
        this.super(e);
        this.lastEvent = e;
        if (!this.$.ripple) {
          var ripple = document.createElement('paper-ripple');
          ripple.setAttribute('id', 'ripple');
          ripple.setAttribute('fit', '');
          if (this.recenteringTouch) {
            ripple.classList.add('recenteringTouch');
          }
          if (!this.fill) {
            ripple.classList.add('circle');
          }
          this.$.ripple = ripple;
          this.shadowRoot.insertBefore(ripple, this.shadowRoot.firstChild);
          // No need to forward the event to the ripple because the ripple
          // is triggered in activeChanged
        }
      }

    });
  