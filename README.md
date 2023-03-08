유튜브 클론코딩을 통해 open source API 를 다루는 방법이나 해당 API 를 불러오는 경우를 최소한으로 관리하고자하는 방법을 배울 수 있었다.
또한, 컴포넌트의 중복을 최소한으로 하여 재사용하게 만든다거나 CSS 적인 부분에 있어서 responsive 하게 다루는 부분에 좀 더 통찰력을 키울 수 있었다.

스킬스택
> React, TypeScript, react-router, react-query, youtube data API, google console

해당 프로젝트의 구조는 App.tsx 파일안에 react-router 로 그 루트와 children 을 설정하여 시작한다. 각 페이지마다 따로 필요한 컴포넌트나 중복되어 사용되는 것은 재사용성을 위해 components 폴더에 저장을 한다.

* App.tsx
    * SearchBar.tsx
    * Outlet 으로 상황에따라 바꿔치기하는 컴포넌트들은 아래에
        * Home.tsx
        * VideoDetail.tsx
        * Notfound.tsx

* Home.tsx
    * SearchBar 라고하는 컴포넌트에서 키워드를 치면, params 로 react-router 를 통해 받아온다 => 해당 키워드를 youtube data API 의 search 를 이용하여 GET request 를 날린다
    * react-query 를 이용하여 같은 키워드에 한하여 약 1시간동안 캐싱을 하여 불필요한 요청의 반복을 최소화한다
    * SingleVideo 라는 컴포넌트를 통해 홈페이지에 보이는 비디오를 하나의 컴포넌트의 반복으로 구성해 재사용성을 최대화한다

* VideoDetail.tsx
    * Home 에서 특정 비디오를 눌렀을시에, 그 비디오의 상세페이지로 넘어가게된다. 이때 해당 비디오의 id 를 props 로 넘겨주어 상세페이지에서 비디오 관련된 정보를 받아오게 한다
    * Video, VideoDescription, RelatedVideoList 로 이루어져 있다
    * Video 는 비디오 자체를 보여주는 iframe 태그
    * VideoDescription 는 비디오 자체의 설명에대한 부분으로 youtube data API 를 통해 해당 채널의 정보도 추가적으로 받아오는 역할을 한다
    * RelatedVideoList 는 해당 비디오와 관련된 비디오의 리스트를 youtube data API 를 통해 받아온다
    * 창의 가로값에 따라 비디오의 사이즈 또한 반응형으로 구성해두었다

* Notfound.tsx
    * 에러가 발생시 표시되는 화면이다

