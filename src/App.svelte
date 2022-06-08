<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import Master from "./views/Master.svelte";
	import Detail from "./views/Detail.svelte";
</script>

<Router primary={false}>
	<Route path="/" >
		<Master />
	</Route>
	<Route path="/master" >
		<Master />
	</Route>
	<Route path="/detail/:id" let:params >
		<Detail id={params.id}/>
	</Route>
</Router>