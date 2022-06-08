_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# MVVM with Svelte

This is a very rudimentary code demonstration of MVVM with Svelte.

## Get started

Install the dependencies...

```bash
cd mvvm-svelte
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000).

You should see the master page running.

## Functionality

The app allows navigation between a master page and a couple of detail pages.
A Busy and an Error State can b e toggled on the master page.
The Mail field can be toggled between true and false on the detail page.
Light and Dark mode can be toggled from the Detail page.

## Intended demonstration

### Models, Services, ViewModels, Views

The relation between these is demonstrated in a Svelte context. The Router routes to Views, which instantiate an associated ViewModel that invokes Services and Models to prepare data for display in a "dumb" View (in this case this is the markup of the component, into which a viewState is injected).

### Busy State

A busy state is demonstrated on the Master page, where it is possible to set a Busy state in the ViewModel through clicking the button. The Busy state is tracked in the associated View of the master page (in the Svelte markup).

### Error State

An error state is also demonstrated on the master page, which has a similar structure to that of the Busy state described above.

### Services

An App State Service is demonstrated using the Light/Dark mode setting, which shows how global state could be managed in the MVVM model. A mock HTTP service is shown delivering JSON data that is then mapped to the View.
