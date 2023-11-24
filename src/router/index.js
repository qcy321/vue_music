import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('views/Index/Index.vue');
const Songs = () => import('views/Index/Songs/Songs.vue');
const HomePage = () => import('views/Index/Songs/HomePage/HomePage.vue');
const Singer = () => import('views/Index/Songs/Singer/Singer.vue');
const MV = () => import('views/Index/Songs/MV/MV.vue');
const S_song = () => import('views/Index/Songs/Song/Song.vue');
const RankingList = () => import('views/Index/Songs/RankingList/RankingList.vue');
const MySong = () => import('views/Index/MySong/MySong.vue');
const Favorite = () => import('views/Index/MySong/Favorite/Favorite.vue');
const Album = () => import('views/Index/MySong/Favorite/Album/album.vue');
const FavSheet = () => import('views/Index/MySong/Favorite/FavSheet/favSheet.vue');
const Song = () => import('views/Index/MySong/Favorite/Song/song.vue');
const myVideo = () => import('views/Index/MySong/Favorite/Video/myVideo.vue');
const Fans = () => import('views/Index/MySong/Fans/Fans.vue');
const SongSheet = () => import('views/Index/MySong/SongSheet/SongSheet.vue');
const Attention = () => import('views/Index/MySong/Attention/Attention.vue');
const mySinger = () => import('views/Index/MySong/Attention/Singer/singer.vue');
const User = () => import('views/Index/MySong/Attention/User/user.vue');
const VIP = () => import('views/Index/VIP/VIP.vue');
const in_sin = () => import('views/Index/Singer/singer.vue');
const sin_album = () => import('views/Index/Singer/Album/sin_album.vue');
const sin_song = () => import('views/Index/Singer/Song/sin_song.vue');
const sin_mv = () => import('views/Index/Singer/MV/sin_mv.vue');
const in_so = () => import('views/Index/Song/song.vue');
const in_a = () => import('views/Index/Album/album.vue');
const Search = () => import('views/Index/Search/search.vue');
const Search_a = () => import('views/Index/Search/Album/album.vue');
const Search_m = () => import('views/Index/Search/MV/mv.vue');
const Search_s = () => import('views/Index/Search/Song/song.vue');
const Search_sheet = () => import('views/Index/Search/SearchSheet/searchSheet.vue');
const Search_singer = () => import('views/Index/Search/Singer/singer.vue');

const Register = () => import('views/Register/Register.vue');
const Sign = () => import('views/Sign/Sign.vue');


const routes = [
  {
    path: '',
    redirect: '/Index',
  },
  {
    path: '/Index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'Songs',
        name: 'Songs',
        component: Songs,
        children: [
          {
            path: 'HomePage',
            name: 'HomePage',
            component: HomePage,
          },
          {
            path: 'MV',
            name: 'MV',
            component: MV,
          },
          {
            path: 'Song',
            name: 'S_song',
            component: S_song,
          },
          {
            path: 'RankingList',
            name: 'RankingList',
            component: RankingList,
          },
          {
            path: 'Singer',
            name: 'Singer',
            component: Singer,
          }
        ]
      },
      {
        path: 'MySong',
        name: 'MySong',
        component: MySong,
        children: [
          {
            path: 'Favorite',
            name: 'Favorite',
            component: Favorite,
            children: [
              {
                path: 'Album',
                name: 'Album',
                component: Album,
              },
              {
                path: 'FavSheet',
                name: 'FavSheet',
                component: FavSheet,
              },
              {
                path: 'Song',
                name: 'Song',
                component: Song,
              },
              {
                path: 'myVideo',
                name: 'myVideo',
                component: myVideo,
              },
            ]
          },
          {
            path: 'Fans',
            name: 'Fans',
            component: Fans,
          },
          {
            path: 'Attention',
            name: 'Attention',
            component: Attention,
            children: [
              {
                path: 'Singer',
                name: 'mySinger',
                component: mySinger,
              },
              {
                path: 'User',
                name: 'User',
                component: User,
              }
            ]
          },
          {
            path: 'SongSheet',
            name: 'SongSheet',
            component: SongSheet,
          }
        ]
      },
      {
        path: 'VIP',
        name: 'VIP',
        component: VIP,
      },
      {
        path: 'Search',
        name: 'Search',
        component: Search,
        children: [
          {
            path: 'Album/:value',
            name: 'Search_a',
            component: Search_a,
          },
          {
            path: 'MV/:value',
            name: 'Search_m',
            component: Search_m,
          },
          {
            path: 'Song/:value',
            name: 'Search_s',
            component: Search_s,
          },
          {
            path: 'Sheet/:value',
            name: 'Search_sheet',
            component: Search_sheet,
          },
          {
            path: 'Singer/:value',
            name: 'Search_singer',
            component: Search_singer,
          }
        ]
      },
      {
        path: 'Singer/:singerId',
        name: 'in_sin',
        component: in_sin,
        children: [
          {
            path: 'Album',
            name: 'sin_album',
            component: sin_album
          },
          {
            path: 'Song',
            name: 'sin_song',
            component: sin_song
          },
          {
            path: 'MV',
            name: 'sin_mv',
            component: sin_mv
          }
        ]
      },
      {
        path: 'Song/:songId',
        name: 'in_so',
        component: in_so
      },
      {
        path: 'Album/:albumId',
        name: 'in_a',
        component: in_a
      },
    ]
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Sign',
    name: 'Sign',
    component: Sign
  },

]

const router = new VueRouter({
  routes,
  mode: "history", //模式，hash模式
})

const originalReplace = VueRouter.prototype.replace
//修改原型对象中的push方法
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function Push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
