<template>
    <div class="tw-relative">
        <div class="tw-relative p-5">
            <table class="w-full text-sm text-left rtl:text-right text-xs bg-white border-b hover:bg-gray-50"
                v-show="salesDates.length > 0">
                <thead>
                    <input type="text" class="border-solid border-2 border-indigo-500 w-3/4 p-1 rounded" />
                </thead>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="tw-th">Sku</th>
                        <th scope="col" class="tw-th">Product name</th>
                        <th scope="col" class="tw-th text-xs">{{ salesDates[0]?.category }} Sales/Units Avg. Selling
                            Price</th>
                        <th scope="col" class="tw-th text-xs" v-if="salesDates.length > 1">{{ salesDates[1]?.category
                        }}
                            Sales/Units Avg. Selling Price</th>
                        <th scope="col" class="tw-th">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="skuItem in displayedItems" :key="skuItem.sku">
                        <th scope="row" class="tw-th whitespace-nowrap text-center">{{ skuItem.sku }}</th>
                        <th scope="row" class="tw-th">{{ skuItem.productName }}</th>
                        <th scope="row" class="tw-th text-center" :class="profitClass(skuItem.amount, skuItem.amount2)">
                            {{ skuItem.amount.toFixed(2) }} / {{ skuItem.qty }}
                            <span class="block" v-if="skuItem.amount / skuItem.qty > 0">{{ (skuItem.amount /
                                skuItem.qty).toFixed(2) }}</span>
                        </th>
                        <th scope="row" class="tw-th text-center" v-if="salesDates.length > 1"
                            :class="profitClass(skuItem.amount2, skuItem.amount)">
                            {{ skuItem.amount2.toFixed(2) }} / {{ skuItem.qty2 }}
                            <span class="block" v-if="skuItem.amount2 / skuItem.qty2 > 0">{{ (skuItem.amount2 /
                                skuItem.qty2).toFixed(2) }}</span>
                        </th>
                        <th scope="row" class="tw-th  text-center">{{ skuItem.sortingAmount.toFixed(2) }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div class="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200" id="pagination">
            <div class="sm:flex hidden">
                <p v-for="pageNumber in totalPages" :key="pageNumber"
                    class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                    {{ pageNumber }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["salesDates"]);
const store = useStore();

const skuList = computed(() => {
    const skuProduct = store.state.chartStore.skuProduct;
    return skuProduct && skuProduct.skuList ? skuProduct.skuList : [];
});


const currentPage = ref(1);
const perPage = 10;

const totalPages = computed(() => {
    return Math.ceil(skuList.value.length / perPage);
});

const displayedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return skuList.value.slice(startIndex, endIndex);
});

const profitClass = (amount: number, amount2: number): string => {
    const difference = amount - amount2;
    if (difference < 0) {
        return "text-red-400";
    } else if (difference === 0) {
        return "text-blue-400";
    } else {
        return "text-green-400";
    }
};


onMounted(async () => {
    try {
        await store.dispatch("chartStore/getSkuListData", props.salesDates);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
</script>

<style lang="scss" scoped>
table {
    tr {
        th {
            max-width: 300px;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
>
