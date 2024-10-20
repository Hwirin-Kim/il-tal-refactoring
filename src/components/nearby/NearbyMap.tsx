import { useEffect } from "react";
import styled from "styled-components";
interface NearbyProps {
  address: string;

  company: string;
}
declare global {
  interface Window {
    kakao: any;
  }
}
const NearbyMap = ({ address, company }: NearbyProps) => {
  const { kakao } = window;

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도에 확대 축소 컨트롤을 생성한다
    // var zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // // 주소로 좌표를 검색합니다
    // geocoder.addressSearch(`${address}`, function (result: any, status: any) {
    //   // 정상적으로 검색이 완료됐으면
    //   if (status === kakao.maps.services.Status.OK) {
    //     var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //     var marker = new kakao.maps.Marker({
    //       map: map,
    //       position: coords,
    //     });

    //     map.setCenter(coords);
    //   }
    // });
  }, [address, company]);

  return (
    <MapContainer
      className="map"
      id="map"
      //   style={{
      //     display: "flex",
      //     flex: 1,
      //     width: "100%",
      //     height: "100%",
      //     borderRadius: "8px",
      //     margin: "0 auto",
      //   }}
    ></MapContainer>
  );
};

export default NearbyMap;

const MapContainer = styled.div`
  display: flex;
  flex: 1;
  border-radius: 10px;
`;
