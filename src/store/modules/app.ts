import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface AppState {
    layout: String
    greyMode: Boolean
    title: String
  }

  @Module({ dynamic: true, namespaced: true, store, name: 'app' })
  class App extends VuexModule implements AppState {
      public layout = 'Classic' // layout布局
      public greyMode = false // 是否开始灰色模式，用于特殊悼念日
      public title = 'demo-for-study' // 标题
      public userInfo = 'userInfo' // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
    
      @Mutation
      private SET_LAYOUT(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
        this.layout = layout
      }
      @Mutation
      private SET_GREYMODE(greyMode: boolean): void {
        this.greyMode = greyMode
      }
      @Mutation
      private SET_TITLE(title: string): void {
        this.title = title
      }

      @Action
      public SetLayout(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
        this.SET_LAYOUT(layout)
      }
      @Action
      public SetGreyMode(greyMode: boolean): void {
        this.SET_GREYMODE(greyMode)
      }
      @Action
      public SetTitle(title: string): void {
        this.SET_TITLE(title)
      }
    }

    export const appStore = getModule<App>(App)