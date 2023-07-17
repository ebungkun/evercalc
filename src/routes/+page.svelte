<script>
  import LevelInput from "../components/LevelInput.svelte";
  import AutoCalc from "../components/AutoCalc.svelte";
  let crystalTotal = 0;
</script>

<div class="container">
  <h1>엡소 레벨 계산기 (베타)</h1>
  <ul>
    <li>골드, 마나 더스트는 무시하고 마나 크리스탈만 고려함</li>
    <li>정령 레벨은 500까지 지원하고, 평렙은 301까지만 계산함</li>
    <li>버그가 있을 수 있음 (그래서 베타임)</li>
    <li>문의는 아카라이브 에버소울 채널 @에붕소울</li>
  </ul>
  <div>
    <LevelInput bind:crystalTotal />
  </div>
  <div>
    <AutoCalc {crystalTotal} />
  </div>
</div>
