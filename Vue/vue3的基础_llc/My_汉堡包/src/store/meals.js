import { defineStore } from "pinia/dist/pinia"

export const useMealsStore = defineStore("meals", {
  state: () => ({
    data: [
      {
        id: "1",
        title: "汉堡包",
        desc: "百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！",
        price: 12,
        img: "/images/meals/1.png",
      },
      {
        id: "2",
        title: "双层吉士汉堡",
        desc: "百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！",
        price: 20,
        img: "/images/meals/2.png",
      },
      {
        id: "3",
        title: "巨无霸",
        desc: "两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！",
        price: 24,
        img: "/images/meals/3.png",
      },
      {
        id: "4",
        title: "麦辣鸡腿汉堡",
        desc: "金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！",
        price: 21,
        img: "/images/meals/4.png",
      },
      {
        id: "5",
        title: "板烧鸡腿堡",
        desc: "原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！",
        price: 22,
        img: "/images/meals/5.png",
      },
      {
        id: "6",
        title: "麦香鸡",
        desc: "清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！",
        price: 14,
        img: "/images/meals/6.png",
      },
      {
        id: "7",
        title: "吉士汉堡包",
        desc: "百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！",
        price: 12,
        img: "/images/meals/7.png",
      },
    ],
    keyword: "",
  }),
  getters: {
    filterMeals: (state) => {
      return state.data.filter(
        (item) => item.title.indexOf(state.keyword) != -1
      )
    },
    // 购买的总个数
    sumBuyHamburg: (state) => {
      let sum = 0
      state.data.forEach((item) => {
        if ("count" in item) {
          sum += item.count
        }
      })
      return sum
    },
    // 购买的总个数的价格
    sumBuyHamburgPrice: (state) => {
      let sum = 0
      state.data.forEach((item) => {
        if ("price" in item && "count" in item) {
          sum += item.price * item.count
        }
      })
      return sum
    },
    // 加入购物车的汉堡
    shoppingCart: (state) => {
      let arr = []
      state.data.forEach((item) => {
        if ("count" in item) {
          item.count === 0 ? null : arr.push(item)
        }
      })
      return arr
    },
  },
  actions: {
    addMealToCart(meal) {
      // 修改购买食物的数量
      // meal还没添加到购物车中
      if (isNaN(meal.count)) {
        meal.count = 0
      }
      meal.count++
    },
    subMealFromCart(meal) {
      if (!isNaN(meal.count)) {
        meal.count--
      }
    },
    clearCart() {
      this.shoppingCart.forEach((item) => {
        item.count = 0
      })
    },
  },
})
