export default () => {
	const loading = ref(false);
	const setLoading = (flag: boolean) => {
		loading.value = flag;
	};
	return {
		setLoading,
		loading
	};
};
