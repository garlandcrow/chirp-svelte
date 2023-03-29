import { page } from '$app/stores'
import { derived } from 'svelte/store'
import { makeTRPCClient } from './trpc'

export default derived(page, ($page) => makeTRPCClient($page))
