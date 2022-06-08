<script>
    import { onMount } from 'svelte';
    import { Link } from "svelte-navigator";
    import { DARK, LIGHT } from '../types';
    import { MasterViewModel } from '../viewmodels/master.ts'
    import { Jumper } from 'svelte-loading-spinners'

    let viewState = undefined
    let viewModel = undefined

    $: {
        if (viewModel) {

          const backgroundColor = viewModel.appState.lightMode === LIGHT ? LIGHT : DARK;
          const textColor = viewModel.appState.lightMode === LIGHT ? DARK : LIGHT;

          viewState = {
            ...viewState,
            records: viewModel.records,
            error: viewModel.error,
            errorMessage: viewModel.error ? viewModel.errorState.message : undefined,
            errorCode: viewModel.error ? viewModel.errorState.code : undefined,
            busy: viewModel.busy,
            lightModeStyle: `background-color: ${backgroundColor}; color: ${textColor}`,
            toggleError: viewModel.toggleError.bind(viewModel),
            toggleBusy: viewModel.toggleBusy.bind(viewModel)
          }
        }
    }

    onMount(async () => {
      viewModel = await new MasterViewModel().initialize()
      viewModel.notifier.subscribe((newViewModel) => {
        viewModel = newViewModel
      })
    })
</script>

{#if viewState}
    <div style={viewState.lightModeStyle} class="container">
      {#if viewState.error}
        <div class="error">Error code {viewState.errorCode}: {viewState.errorMessage}</div>
      {:else}
          <h1>Customers Master Page</h1>

          {#if viewState.busy}
            <div class="busy"><Jumper /></div>
          {:else}
            <ul>
              {#each viewState.records as record}
                <div><Link to="/detail/{record.id}">{record.name}</Link></div>
              {/each}
            </ul>
          {/if}
          <div><button on:click={viewState.toggleBusy}>Toggle Busy State</button></div>  
      {/if}
      <div><button on:click={viewState.toggleError}>Toggle Error State</button></div>
    </div>
{/if}

<style>
  .container {
    text-align: center;
  }
  .error {
    color: red;
  }
  .busy {
    width: 10rem;
    margin: auto;
  }
</style>