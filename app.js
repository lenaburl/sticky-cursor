const initCursor = () => {
  this.outerCursor = document.getElementById('cursor');
  this.outerCursorBox = this.outerCursor.getBoundingClientRect();
  this.outerCursorSpeed = 0;
  this.clientX = -8;
  this.clientY = -8;
  this.showCursor = false;
  this.backgroundColor = 'brown';
  this.borderColor = 'brown';
  this.zIndex = 100;

  const unveilCursor = () => {
    TweenMax.set(this.outerCursor, {
      x: this.clientX - this.outerCursorBox.width / 2,
      y: this.clientY - this.outerCursorBox.height / 2
    });
    setTimeout(() => {
      this.outerCursorSpeed = 0.2;
    }, 100);
    this.showCursor = true;
  };
  document.addEventListener("mousemove", unveilCursor);

  document.addEventListener("mousemove", e => {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  });

  const render = () => {
    if (!this.isStuck) {
      TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
        x: this.clientX - this.outerCursorBox.width / 2,
        y: this.clientY - this.outerCursorBox.height / 2
      });
    }
    if (this.showCursor) {
      document.removeEventListener("mousemove", unveilCursor);
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};
initCursor();

const initHovers = () => {
  // bagel links
  const handleBagelMouseEnter = e => {
    this.isStuck = true;
    const target = e.currentTarget;
    const borderColor = target.getAttribute('data-sticky-cursor-color');
    const box = target.getBoundingClientRect();
    this.outerCursorOriginals = {
      height: this.outerCursorBox.height,
      borderColor: this.borderColor,
      backgroundColor: this.backgroundColor
    };
    TweenMax.to(this.outerCursor, 0.2, {
      x: box.left - 15,
      y: box.top + box.height / 2 - this.outerCursorOriginals.height / 2,
      borderColor: borderColor ? borderColor : this.outerCursorOriginals.borderColor,
      backgroundColor: 'transparent'
    });
  };
  const handleBagelMouseLeave = () => {
    this.isStuck = false;
    TweenMax.to(this.outerCursor, 0.2, {
      borderColor: this.outerCursorOriginals.borderColor,
      backgroundColor: this.outerCursorOriginals.backgroundColor
    });
  };
  const bagelItems = document.querySelectorAll('[data-sticky-cursor="bagel"]');
  bagelItems.forEach(item => {
    item.addEventListener("mouseenter", handleBagelMouseEnter);
    item.addEventListener("mouseleave", handleBagelMouseLeave);
  });

  // links with circle
  const handleCircleMouseEnter = e => {
    this.isStuck = true;
    const target = e.currentTarget;
    const borderColor = target.getAttribute('data-sticky-cursor-color');
    const isFilled = target.hasAttribute('data-sticky-cursor-filled');
    const element = target.querySelectorAll('[data-sticky-cursor-item]')[0];
    const box = element.getBoundingClientRect();
    this.outerCursorOriginals = {
      width: this.outerCursorBox.width,
      height: this.outerCursorBox.height,
      borderColor: this.borderColor,
      backgroundColor: this.backgroundColor
    };
    TweenMax.to(this.outerCursor, 0.2, {
      x: box.left,
      y: box.top,
      width: box.width,
      height: box.height,
      borderColor: borderColor ? borderColor : this.outerCursorOriginals.borderColor,
      backgroundColor: isFilled ? borderColor : 'transparent'
    });
    if (isFilled) {
      this.outerCursor.style.zIndex = '0';
    }
  };
  const handleCircleMouseLeave = () => {
    this.isStuck = false;
    TweenMax.to(this.outerCursor, 0.2, {
      width: this.outerCursorOriginals.width,
      height: this.outerCursorOriginals.height,
      borderColor:  this.outerCursorOriginals.borderColor,
      backgroundColor: this.outerCursorOriginals.backgroundColor
    });
    this.outerCursor.style.zIndex = this.zIndex;
  };
  const circleItems = document.querySelectorAll('[data-sticky-cursor="circle"]');
  circleItems.forEach(item => {
    item.addEventListener("mouseenter", handleCircleMouseEnter);
    item.addEventListener("mouseleave", handleCircleMouseLeave);
  });
};
initHovers();
