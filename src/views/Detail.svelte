<script>
    import { onMount } from 'svelte';
    import { Link } from "svelte-navigator";
    import { DARK, LIGHT } from '../types';
    import { DetailViewModel } from '../viewmodels/detail.ts'

    export let id = undefined

    let viewState = undefined
    let viewModel = undefined

    // View Model ----> View data mapping
    $: {
        // Wait for ViewModel to be initialized
        if (viewModel) {

          const backgroundColor = viewModel.appState.lightMode === LIGHT ? LIGHT : DARK;
          const textColor = viewModel.appState.lightMode === LIGHT ? DARK : LIGHT;

          viewState = {

            // Clones original state, triggering render update
            ...viewState,

            // Selectively adds new ViewModel updates
            record: viewModel.record,
            appState: viewModel.appState,
            lightModeStyle: `background-color: ${backgroundColor}; color: ${textColor}`,
            toggleLightDark: viewModel.toggleLightDark.bind(viewModel),
            toggleMailFlag: viewModel.toggleMailFlag.bind(viewModel)
          }
        }
    }

    onMount(async () => {
      // Forwards initial View Model state to View
      viewModel = await new DetailViewModel().initialize(id)

      viewModel.notifier.subscribe((newViewModel) => {

          // Forwards subsequent View Model state updates to View
          viewModel = newViewModel
      })
    })

</script>

{#if viewState}
    <div style={viewState.lightModeStyle} class="container">
        <h1>Detail Page for {viewState.record.firstname} {viewState.record.surname}</h1>
        <div><Link to="/master">Back to Master page</Link></div>
        <div class="light-mode"><button on:click={viewState.toggleLightDark}>Toggle Light and Dark Mode</button></div>
        
        <div class="record">
          <table class="table">
            <tr>
              <th>Title</th>
              <td>{viewState.record.title}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{viewState.record.firstname}</td>
            </tr>
            <tr>
              <th>Surname</th>
              <td>{viewState.record.surname}</td>
            </tr>
            <tr>
              <th>Address 1</th>
              <td>{viewState.record.address1}</td>
            </tr>
            <tr>
              <th>Address 2</th>
              <td>{viewState.record.address2}</td>
            </tr>
            <tr>
              <th>Postcode</th>
              <td>{viewState.record.postcode}</td>
            </tr>
            <tr>
              <th>Telephone</th>
              <td>{viewState.record.telephone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{viewState.record.email}</td>
            </tr>
            <tr>
              <th>Mail</th>
              <td>{viewState.record.mail}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{viewState.record.age}</td>
            </tr>
          </table>
        </div>
        <div><button on:click={viewState.toggleMailFlag.bind(viewModel)}>Toggle Mail Flag</button></div> 
    </div>
{/if}

<style type="text/scss">
  .container {
    text-align: center;
  }
  .record {
    margin: 1rem;
  }
  .light-mode {
    margin: 1rem;
  }
  .table {
    margin-left: auto;
    margin-right: auto;
    width: 50rem;

    th {
      width: 10rem;
      text-align: right;
      padding: 0.5em;
    }

    td {
      width: 10rem;
      text-align: left;
      padding: 0.5rem;
    }
  }
</style>