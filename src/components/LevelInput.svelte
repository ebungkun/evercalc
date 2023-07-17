<script>
  export let crystalTotal;
  import { levelToCrystal } from "$lib/utils";

  let inputLevels = Array(5).fill(null);
  let fillvalue = null;

  $: crystalTotal = inputLevels.map(levelToCrystal).reduce((x, y) => x + y, 0);
</script>

<article>
  <header>현재 레벨 입력</header>
  <div class="grid">
    <form>
      {#each inputLevels as level, i}
        <div>
          <label
            >정령{i + 1}
            <input
              type="number"
              min="1"
              max="500"
              step="1"
              required
              bind:value={level}
            />
          </label>
        </div>
      {/each}
      <button style:visibility="hidden" />
    </form>
    <form>
      <label>
        채울 값
        <input type="number" min="1" max="500" bind:value={fillvalue} />
      </label>
      <button
        class="outline"
        on:click={() => (inputLevels = Array(5).fill(fillvalue))}>채우기</button
      >
    </form>
  </div>
  <footer>마나 크리스탈 보유량: {crystalTotal}</footer>
</article>
