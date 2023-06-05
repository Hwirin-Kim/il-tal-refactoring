import React, { useState } from "react";

export const useCarousel = (list: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const onMouseDownHandler = (mouseDownEvent: React.MouseEvent) => {
    //브라우저 기본 동작 중단
    mouseDownEvent.preventDefault();

    const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
      //delta = 드래그한 x값
      const delta = mouseMoveEvent.screenX - mouseDownEvent.screenX;
      setDeltaX(delta);
    };

    const mouseUpHandler = (mouseUpEvent: MouseEvent) => {
      const delta = mouseUpEvent.screenX - mouseDownEvent.screenX;
      const maxIndex = list.length - 1;
      //일정 이상 드래그 되면 다음 슬라이드로 이동
      if (delta < -50 && currentIndex !== maxIndex)
        setCurrentIndex((prev) => prev + 1);
      if (delta > 50 && currentIndex > 0) setCurrentIndex((prev) => prev - 1);
      setDeltaX(0);
      document.removeEventListener("mousemove", onMouseMoveHandler);

      if (Math.abs(delta) < 5) {
        setIsClick(true);
      } else if (Math.abs(delta) > 5) {
        setIsClick(false);
      }
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, {
      once: true,
    });
  };
  const onTouchHandler = (touchStartEvent: React.TouchEvent) => {
    //브라우저 기본 동작 중단

    const onTouchMoveHandler = (touchMoveEvent: TouchEvent) => {
      //delta = 드래그한 x값
      const delta =
        touchMoveEvent.touches[0].screenX - touchStartEvent.touches[0].screenX;
      setDeltaX(delta);
    };

    const touchEndHandler = (touchEndEvent: TouchEvent) => {
      const delta =
        touchEndEvent.changedTouches[0].screenX -
        touchStartEvent.touches[0].screenX;
      const maxIndex = list.length - 1;
      //일정 이상 드래그 되면 다음 슬라이드로 이동
      if (delta < -50 && currentIndex !== maxIndex)
        setCurrentIndex((prev) => prev + 1);
      if (delta > 50 && currentIndex > 0) setCurrentIndex((prev) => prev - 1);
      setDeltaX(0);
      document.removeEventListener("touchmove", onTouchMoveHandler);

      if (Math.abs(delta) < 5) {
        setIsClick(true);
      } else if (Math.abs(delta) > 5) {
        setIsClick(false);
      }
    };

    document.addEventListener("touchmove", onTouchMoveHandler, {
      passive: false,
    });
    document.addEventListener("touchend", touchEndHandler, {
      once: true,
    });
  };

  //터치이벤트가 있는 경우와 없는 경우로 구분하여 return
  if ("ontouchstart" in window) {
    return [deltaX, currentIndex, { onTouchStart: onTouchHandler }];
  } else {
    return [deltaX, currentIndex, { onMouseDown: onMouseDownHandler }];
  }
};
