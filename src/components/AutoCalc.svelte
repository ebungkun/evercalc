<script>
  export let crystalTotal;
  import { crystalToLevel, levelToCrystal } from "$lib/utils";

  let minLevel = 180;
  let tankUpStep = 1;

  $: maxAvgLevel = crystalToLevel(Math.floor(crystalTotal / 5) + 1);

  $: avgLevels = [
    40, 60, 80, 100, 120, 140, 160, 180, 200, 211, 221, 231, 241, 251, 261, 271,
    281, 291, 301,
  ].filter((value) => value >= minLevel);

  $: maxAceLevels = avgLevels.map((avgLevel) =>
    calcMaxAceLevel(crystalTotal, avgLevel)
  );

  $: tankLevels = avgLevels.map((val, idx) =>
    calcMaxTankLevel(val, maxAceLevels[idx], tankUpStep)
  );

  $: altAceLevels = tankLevels.map((val, idx) =>
    calcAltAceLevel(val, avgLevels[idx], crystalTotal)
  );

  function calcMaxTankLevel(avgLevel, aceLevel, upstep = 1) {
    let tankLevel = avgLevel;
    let stepCount = 0;
    for (let level of avgLevels) {
      if (level > avgLevel && level < aceLevel) {
        tankLevel = level;
        stepCount += 1;
        if (stepCount >= upstep) {
          break;
        }
      }
    }
    return tankLevel;
  }

  function calcAltAceLevel(tankLevel, avgLevel, crystalAvailable) {
    const aceBudget =
      crystalAvailable -
      levelToCrystal(tankLevel) -
      3 * levelToCrystal(avgLevel);
    return crystalToLevel(aceBudget);
  }

  function calcMaxAceLevel(crystalAvailable, avgLevel, numOthers = 4) {
    const baseCost = levelToCrystal(avgLevel);
    const budget = crystalAvailable - numOthers * baseCost;
    if (budget <= baseCost) {
      return avgLevel;
    }
    return crystalToLevel(budget);
  }
</script>

<article>
  <header>딜러+평렙 세팅</header>
  <div>
    <label>
      <input
        type="range"
        min="40"
        max={maxAvgLevel}
        step="10"
        bind:value={minLevel}
      />
      평렙
      {minLevel}
      이상만 보기
    </label>
  </div>

  <footer>
    <table>
      <thead>
        <tr>
          <th scope="col">평렙</th> <th scope="col">딜러</th>
          <th scope="col">총 비용</th>
        </tr>
      </thead>
      <tbody>
        {#each avgLevels as avgLevel, i}
          {#if 5 * levelToCrystal(avgLevel) <= crystalTotal}
            <tr>
              <th scope="row">{avgLevel}</th>
              <td>
                {maxAceLevels[i]}
              </td>
              <td>
                {4 * levelToCrystal(avgLevel) + levelToCrystal(maxAceLevels[i])}
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </footer>
</article>

<!-- <p>avgLevels {avgLevels}</p>
<p>maxAceLevels {maxAceLevels}</p>
<p>tankLevels {tankLevels}</p>
<p>altAceLevels {altAceLevels}</p> -->

<article>
  <header>딜+탱+평렙 세팅 (실험 기능)</header>
  <div>
    <label>
      <input type="range" min="1" max="3" step="1" bind:value={tankUpStep} />
      탱 레벨을 평렙보다 {tankUpStep} 단계 올리기
    </label>
  </div>
  <footer>
    <table>
      <thead>
        <tr>
          <th scope="col">평렙</th> <th scope="col">탱</th>
          <th scope="col">딜</th>
          <th scope="col">총 비용</th>
        </tr>
      </thead>
      <tbody>
        {#each avgLevels as avgLevel, i}
          {#if 5 * levelToCrystal(avgLevel) <= crystalTotal}
            <tr>
              <th scope="row">{avgLevel}</th>
              <td>
                {tankLevels[i]}
              </td>
              <td>
                {altAceLevels[i]}
              </td>
              <td>
                {3 * levelToCrystal(avgLevel) +
                  levelToCrystal(tankLevels[i]) +
                  levelToCrystal(altAceLevels[i])}
              </td>
            </tr>{/if}
        {/each}
      </tbody>
    </table>
  </footer>
</article>
