import React, { useState, useEffect } from "react";

const getCurrentLocation = () => {
  return new Promise<{ longitude: number; latitude: number }>(
    (resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    }
  );
};

export default function useGeolocation() {
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
        setError(null); // 에러 초기화
      } catch (err) {
        const errorMessage = (err as GeolocationPositionError).message;

        if ((err as GeolocationPositionError).code === 1) {
          // 사용자가 권한을 거부한 경우
          const retry = window.confirm(
            "위치 권한이 거부되었습니다. 브라우저 설정에서 권한을 다시 허용하시겠습니까?"
          );

          if (retry) {
            // 사용자가 확인을 누르면 권한 설정 안내 표시
            window.alert(
              "브라우저 설정에서 위치 권한을 허용하고 다시 시도해주세요."
            );
          }
        }

        setError(errorMessage);
      }
    };

    fetchLocation();
  }, []);

  return { currentLocation, error };
}
