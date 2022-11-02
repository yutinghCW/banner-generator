<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-md-6">
        <h2 class="mt0">請選擇社群及類型</h2>
        <div class="d-flex mb40">
          <div class="select__group select__group--filled select__group--defalt">
            <select id="social" name="social" v-model="social.select" @change="detectType()">
              <option
                v-for="item in social.items" :value="item.value" :key="item.value"
              >{{ item.display }}</option>
            </select>
          </div>
          <div
            class="select__group select__group--filled select__group--defalt"
            v-if="types.length !== 0"
          >
            <select id="type" name="type" v-model="type.select" @change="detectType()">
              <option
                v-for="item in types" :value="item.value" :key="item.value"
                :disabled="types.length === 0"
              >{{ item.display }}</option>
            </select>
          </div>
        </div>
        <h2 class="mt0">請填寫欄位</h2>
        <template v-if="type.select === 'line-podcast-list'">
          <div class="mb20">
            <input
              type="file" name="Filedata1" ref="Filedata1" id="file_upload1" accept="image/*"
              @change="onFileSelected('file_upload1', 'first', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.first.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.first.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__group form__group--outlined w-100 mb20">
              <label class="label form__group--defalt">
                <textarea
                v-model="value.group.first.title"
                  class="form__group__input d-block"
                  style="min-height: 80px;"
                ></textarea>
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.group.first.title).length > value.group.first.limit
                  }"
                >
                  <template
                    v-if="!(removeTags(value.group.first.title).length > value.group.first.limit)"
                  >
                    建議字數{{ value.group.first.limit }}字
                  </template>
                  <template
                    v-if="removeTags(value.group.first.title).length > value.group.first.limit"
                  >
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <hr class="mb20">
          <div class="mb20">
            <input
              type="file" name="Filedata2" ref="Filedata2" id="file_upload2" accept="image/*"
              @change="onFileSelected('file_upload2', 'second', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.second.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.second.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__group form__group--outlined w-100 mb20">
              <label class="label form__group--defalt">
                <textarea
                v-model="value.group.second.title"
                  class="form__group__input d-block"
                  style="min-height: 80px;"
                ></textarea>
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.group.second.title).length > value.group.second.limit
                  }"
                >
                  <template
                    v-if="!(removeTags(value.group.second.title).length > value.group.second.limit)"
                  >
                    建議字數{{ value.group.second.limit }}字
                  </template>
                  <template
                    v-if="removeTags(value.group.second.title).length > value.group.second.limit"
                  >
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <hr class="mb20">
          <div class="mb20">
            <input
              type="file" name="Filedata3" ref="Filedata3" id="file_upload3" accept="image/*"
              @change="onFileSelected('file_upload3', 'third', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.third.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.third.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.third.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.third.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.third.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__group form__group--outlined w-100 mb20">
              <label class="label form__group--defalt">
                <textarea
                v-model="value.group.third.title"
                  class="form__group__input d-block"
                  style="min-height: 80px;"
                ></textarea>
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.group.third.title).length > value.group.third.limit
                  }"
                >
                  <template
                    v-if="!(removeTags(value.group.third.title).length > value.group.third.limit)"
                  >
                    建議字數{{ value.group.third.limit }}字
                  </template>
                  <template
                    v-if="removeTags(value.group.third.title).length > value.group.third.limit"
                  >
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <hr class="mb20">
          <div class="mb20">
            <input
              type="file" name="Filedata4" ref="Filedata4" id="file_upload4" accept="image/*"
              @change="onFileSelected('file_upload4', 'forth', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.forth.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.forth.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.forth.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.forth.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.forth.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__group form__group--outlined w-100 mb20">
              <label class="label form__group--defalt">
                <textarea
                v-model="value.group.forth.title"
                  class="form__group__input d-block"
                  style="min-height: 80px;"
                ></textarea>
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.group.forth.title).length > value.group.forth.limit
                  }"
                >
                  <template
                    v-if="!(removeTags(value.group.forth.title).length > value.group.forth.limit)"
                  >
                    建議字數{{ value.group.forth.limit }}字
                  </template>
                  <template
                    v-if="removeTags(value.group.forth.title).length > value.group.forth.limit"
                  >
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <hr class="mb20">
        </template>
        <template v-else-if="type.select === 'youtube-media'">
          <div class="mb20">
            <h3 class="mt0">背景圖片</h3>
            <input
              type="file" name="Filedata1" ref="Filedata1" id="file_upload1" accept="image/*"
              @change="onFileSelected('file_upload1', 'first', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.first.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.first.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.first.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="mb20">
          <div class="mb20">
            <h3 class="mt0">記者圖片</h3>
            <input
              type="file" name="Filedata2" ref="Filedata2" id="file_upload2" accept="image/*"
              @change="onFileSelected('file_upload2', 'second', 'group')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.group.second.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.group.second.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.scale"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.horizontal"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.group.second.vertical"
                            min="-100"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="mb20">
          <div>
            <h3 class="mt0">媒體 Logo</h3>
            <input
              type="file" name="Filedata3" ref="Filedata3" id="file_upload3" accept="image/*"
              @change="onFileSelected('file_upload3', 'third', 'group')"
            />
          </div>
          <hr class="mb20">
          <div class="form__group form__group--ckeditor w-100 mb20">
            <h3 class="mb-0">{{ headers.title }}</h3>
            <div
              class="label form__group--defalt"
              :class="{
                'form__group--error': removeTags(value.title.value).length > value.title.limit,
              }"
            >
              <ckeditor
                :editor="editor"
                v-model="value.title.value"
                :config="editorConfig"
              ></ckeditor>
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.title.value).length > value.title.limit
                }"
              >
                <template v-if="!(removeTags(value.title.value).length > value.title.limit)">
                  建議字數{{ value.title.limit }}字
                </template>
                <template v-if="removeTags(value.title.value).length > value.title.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div class="form__group w-100 mb20">
            <h3 class="mb-0">{{ headers.subtitle }}</h3>
            <div
              class="form__group form__group--outlined w-100 mb20"
              :class="{
                'form__group--error':
                removeTags(value.subtitle.value).length > value.subtitle.limit,
              }"
            >
              <label class="label form__group--defalt">
                <input
                  type="text"
                  v-model="value.subtitle.value"
                  class="form__group__input d-block"
                >
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.subtitle.value).length > value.subtitle.limit
                  }"
                >
                  <template
                    v-if="!(removeTags(value.subtitle.value).length > value.subtitle.limit)"
                  >
                    建議字數{{ value.subtitle.limit }}字
                  </template>
                  <template
                    v-if="removeTags(value.subtitle.value).length > value.subtitle.limit"
                  >
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="mb20" v-if="checkImg()">
            <h3 class="mb-0">上傳檔案</h3>
            <input
              type="file" name="Filedata" ref="Filedata" id="file_upload" accept="image/*"
              @change="onFileSelected('file_upload', null, 'single')"
            />
            <div class="form__editable my20">
              <label class="d-block">
                <span class="label--check">
                  <input type="checkbox" v-model="editable.switch" name="啟動修改">
                  <span class="label__check__mark"></span>
                  <span class="label__check__txt">修改圖片縮放及位置</span>
                </span>
              </label>
              <div class="bg-gray-100 mt10 p-4" v-if="editable.switch">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片縮放</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-minus"></i>
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.scale"
                            min="-100"
                            id="customRange1"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            <i class="icon icon-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 px-4">
                      <h4 class="color-secondary-variant my0">圖片位移</h4>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            左
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.horizontal"
                            min="-100"
                            id="customRange2"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            右
                          </button>
                        </div>
                      </div>
                      <div class="row g-4 align-items-center pt-3">
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            上
                          </button>
                        </div>
                        <div class="col">
                          <input
                            type="range"
                            class="form-range"
                            v-model="editable.vertical"
                            min="-100"
                            id="customRange3"
                          >
                        </div>
                        <div class="col-auto text-center">
                          <button type="button" class="btn p-0">
                            下
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="form__group form__group--ckeditor w-100 mb20"
            v-if="checkTitle() && checkEditor()"
          >
            <h3 class="mb-0">{{ headers.title }}</h3>
            <div
              class="label form__group--defalt"
              :class="{
                'form__group--error': removeTags(value.title.value).length > value.title.limit,
              }"
            >
              <ckeditor
                :editor="editor"
                v-model="value.title.value"
                :config="editorConfig"
              ></ckeditor>
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.title.value).length > value.title.limit
                }"
              >
                <template v-if="!(removeTags(value.title.value).length > value.title.limit)">
                  建議字數{{ value.title.limit }}字
                </template>
                <template v-if="removeTags(value.title.value).length > value.title.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-else-if="checkTitle() && checkSingleLine()"
          >
            <h3 class="mb-0">{{ headers.title }}</h3>
            <div
              class="form__group--defalt"
              :class="{
                'hasValue': value.content.value !== '',
                'form__group--error': countLines(value.content.value) > value.content.limit,
              }"
            >
              <label class="label form__group--defalt">
                <input type="text" v-model="value.title.value" class="form__group__input d-block">
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.title.value).length > value.title.limit
                  }"
                >
                  <template v-if="!(removeTags(value.title.value).length > value.title.limit)">
                    建議字數{{ value.title.limit }}字
                  </template>
                  <template v-if="removeTags(value.title.value).length > value.title.limit">
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <div
            class="form__group form__group--ckeditor w-100 mb20"
            v-else-if="checkTitle()"
          >
            <h3 class="mb-0">{{ headers.title }}</h3>
            <div class="label form__group--defalt">
              <textarea v-model="value.title.value" class="form__group__input d-block"></textarea>
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.title.value).length > value.title.limit
                }"
              >
                <template v-if="!(removeTags(value.title.value).length > value.title.limit)">
                  建議字數{{ value.title.limit }}字
                </template>
                <template v-if="removeTags(value.title.value).length > value.title.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div
            class="form__group form__group--ckeditor w-100 mb20"
            v-if="checkSubtitle() && checkEditor() && !checkSingleLine()"
          >
            <h3 class="mb-0">{{ headers.subtitle }}</h3>
            <div
              class="label form__group--defalt"
              :class="{
                'form__group--error': removeTags(value.subtitle.value).length>value.subtitle.limit,
              }"
            >
              <ckeditor
                :editor="editor"
                v-model="value.subtitle.value"
                :config="editorConfig"
              ></ckeditor>
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.subtitle.value).length > value.subtitle.limit
                }"
              >
                <template v-if="!(removeTags(value.subtitle.value).length > value.subtitle.limit)">
                  建議字數{{ value.subtitle.limit }}字
                </template>
                <template v-if="removeTags(value.subtitle.value).length > value.subtitle.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-else-if="checkSubtitle() && checkSingleLine()"
          >
            <h3 class="mb-0">{{ headers.subtitle }}</h3>
            <label class="label form__group--defalt">
              <input type="text" v-model="value.subtitle.value" class="form__group__input d-block">
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.subtitle.value).length > value.subtitle.limit
                }"
              >
                <template v-if="!(removeTags(value.subtitle.value).length > value.subtitle.limit)">
                  建議字數{{ value.subtitle.limit }}字
                </template>
                <template v-if="removeTags(value.subtitle.value).length > value.subtitle.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </label>
          </div>
          <div
            class="form__group form__group--ckeditor w-100 mb20"
            v-else-if="checkSubtitle()"
          >
            <h3 class="mb-0">{{ headers.subtitle }}</h3>
            <div class="label form__group--defalt">
              <textarea
                v-model="value.subtitle.value"
                class="form__group__input d-block"
              ></textarea>
              <span
                class="form__group__help--strong"
                :class="{
                  'form__group__help--highlight':
                  removeTags(value.subtitle.value).length > value.subtitle.limit
                }"
              >
                <template v-if="!(removeTags(value.subtitle.value).length > value.subtitle.limit)">
                  建議字數{{ value.subtitle.limit }}字
                </template>
                <template v-if="removeTags(value.subtitle.value).length > value.subtitle.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-if="checkContent() && checkMultiLine()"
          >
            <h3 class="mb-1">{{ headers.content }}</h3>
            <div
              class="form__group--defalt"
              :class="{
                'hasValue': value.content.value !== '',
                'form__group--error': countLines(value.content.value) > value.content.limit,
              }"
            >
              <label class="label form__group--defalt">
                <input type="text" v-model="value.content.value" class="form__group__input d-block">
                <span
                  class="form__group__help--strong"
                  :class="{
                    'form__group__help--highlight':
                    removeTags(value.content.value).length > value.content.limit
                  }"
                >
                  <template v-if="!(removeTags(value.content.value).length > value.content.limit)">
                    建議字數{{ value.content.limit }}字
                  </template>
                  <template v-if="removeTags(value.content.value).length > value.content.limit">
                    已超過建議字數，請透過預覽查看是否有跑版
                  </template>
                </span>
              </label>
            </div>
          </div>
          <div class="form__group form__group--outlined w-100 mb20" v-else-if="checkContent()">
            <h3 class="mb-1">{{ headers.content }}</h3>
            <div
              class="label form__group--defalt"
              :class="{
                'hasValue': value.content.value !== '',
                'form__group--error': countLines(value.content.value) > value.content.limit,
              }"
            >
              <textarea v-model="value.content.value" class="form__group__input d-block"></textarea>
              <span
                class="form__group__help--strong d-block"
                :class="{
                  'form__group__help--highlight':
                  countLines(value.content.value) > value.content.limit
                }"
              >
                <template v-if="!(countLines(value.content.value) > value.content.limit)">
                  建議行數{{ value.content.limit }}行
                </template>
                <template v-if="countLines(value.content.value) > value.content.limit">
                  已超過建議行數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-if="type.select === 'line-english'"
          >
            <h3 class="mb-1">中英對照</h3>
            <label class="d-block">
              <span class="label--check">
                <input type="checkbox" v-model="value.translate" name="中英對照啟用">
                <span class="label__check__mark"></span>
                <span class="label__check__txt">啟用</span>
              </span>
            </label>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-if="type.select === 'webpush'"
          >
            <h3 class="mb-1">即時更新</h3>
            <label class="d-block">
              <span class="label--check">
                <input type="checkbox" v-model="value.live" name="即時更新">
                <span class="label__check__mark"></span>
                <span class="label__check__txt">啟用</span>
              </span>
            </label>
          </div>
          <div
            class="form__group form__group--outlined w-100 mb20"
            v-if="type.select === 'youtube-header'"
          >
            <h3 class="mb-1">對齊方式</h3>
            <label class="d-block mb-2">
              <span class="label--radio">
                <input type="radio"
                  v-model="value.align"
                  :checked="value.align === '靠左對齊'"
                  name="對齊方式"
                  value="靠左對齊"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">靠左對齊</span>
              </span>
            </label>
            <label class="d-block mb-2">
              <span class="label--radio">
                <input
                  type="radio"
                  v-model="value.align"
                  :checked="value.align === '置中'"
                  name="對齊方式"
                  value="置中"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">置中</span>
              </span>
            </label>
            <label class="d-block mb-2">
              <span class="label--radio">
                <input
                  type="radio"
                  v-model="value.align"
                  :checked="value.align === '靠右對齊'"
                  name="對齊方式"
                  value="靠右對齊"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">靠右對齊</span>
              </span>
            </label>
          </div>
          <div class="form__group form__group--outlined w-100 mb20" v-if="checkCta()">
            <h3 class="mb-1">{{ headers.cta }}</h3>
            <div
              class="label form__group--defalt"
              :class="{
                'hasValue': value.cta.value !== '',
                'form__group--error': value.cta.value.length > value.cta.limit,
              }"
            >
              <textarea
                v-model="value.cta.value"
                class="form__group__input d-block"
                style="min-height: 80px;"
              ></textarea>
              <span
                class="form__group__help--strong d-block"
                :class="{'form__group__help--highlight': value.cta.value.length > value.cta.limit}"
              >
                <template v-if="!(value.cta.value.length > value.cta.limit)">
                  建議字數{{ value.cta.limit }}字
                </template>
                <template v-if="value.cta.value.length > value.cta.limit">
                  已超過建議字數，請透過預覽查看是否有跑版
                </template>
              </span>
            </div>
          </div>
        </template>
        <div class="form__logos mb20" v-if="checkLogo()">
          <h3 class="mb-1">選擇 Logo 樣式</h3>
          <div
            v-if="type.select !== 'line-podcast-list'"
            class="row mt-2"
          >
            <div class="col-md-3 mb-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.white.primary"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.white.primary"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-white-primary.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3 mb-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.white.black"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.white.black"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-white-black.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3 mb-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.transparent.primary"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.transparent.primary"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-primary-transparent.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3 mb-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.transparent.black"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.transparent.black"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-black-transparent.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3 mb-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.transparent.white"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.transparent.white"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-white-transparent.svg" class="bg-gray-300" alt="">
                </span>
              </label>
            </div>
          </div>
          <div
            v-if="type.select === 'line-podcast-list'"
            class="row mt-2"
          >
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-podcast-square-cw"
                  :value="value.logo.podcast.square.cw"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.podcast.square.cw"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/podcast-cw.jpg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-podcast-square-channel"
                  :value="value.logo.podcast.square.channel"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.podcast.square.channel"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/podcast-channel.jpg" alt="">
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="mb20" v-if="checkAd()">
          <h3 class="mb-0">用途</h3>
          <label class="d-block">
            <span class="label--check">
              <input type="checkbox" v-model="value.logo.disabled" name="廣編影音">
              <span class="label__check__mark"></span>
              <span class="label__check__txt">廣編影音（LAB）</span>
            </span>
          </label>
        </div>
      </div>
      <div
        class="col-md-6 d-flex flex-column align-items-center position-sticky top-0 start-0"
      >
        <IgPicture
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'ig-cw-picture-post' || type.select === 'ig-cw-picture-story'"
        />
        <IgQuote
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'ig-quote-post' || type.select === 'ig-quote-story'"
        />
        <IgSummary
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'ig-summary-post' || type.select === 'ig-summary-story'"
        />
        <IgFaq
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'ig-faq-word-story' || type.select === 'ig-faq-picture-story'"
        />
        <LineComponent
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select.indexOf('line-') > -1 && type.select !== 'line-podcast-list'"
        />
        <LinePodcastList
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'line-podcast-list'"
        />
        <EdmPodcast
          :class="type.select"
          :value="value"
          :editable="editable"
          id="preview"
          v-if="type.select === 'edm-economist-podcast'"
        />
        <YoutubeComponent
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="
            type.select.indexOf('youtube-') > -1 &&
            type.select !== 'youtube-policy' &&
            type.select !== 'youtube-media' &&
            type.select !== 'youtube-header'
          "
        />
        <YoutubePolicy
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select.indexOf('youtube-') > -1 && type.select === 'youtube-policy'"
        />
        <YoutubeMedia
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select.indexOf('youtube-') > -1 && type.select === 'youtube-media'"
        />
        <YoutubeHeader
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select.indexOf('youtube-') > -1 && type.select === 'youtube-header'"
        />
        <WebPushComponent
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          v-if="type.select === 'webpush'"
          id="preview"
        />
        <VideoComponent
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select.indexOf('cwvideo-') > -1"
        />
        <CwComponent
          :class="type.select"
          :value="value"
          :type="type"
          :editable="editable"
          id="preview"
          v-if="type.select === 'cw-logo'"
        />
        <div class="text-center mt40">
          <button
            type="button"
            class="btn btn--contained"
            @click="screenshot();"
          >下載</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Font from '@ckeditor/ckeditor5-font/src/font';

import domtoimage from 'dom-to-image-more-v2';

import IgPicture from '@/components/IgPicture.vue';
import IgQuote from '@/components/IgQuote.vue';
import IgSummary from '@/components/IgSummary.vue';
import IgFaq from '@/components/IgFaq.vue';

import LineComponent from '@/components/LineComponent.vue';
import LinePodcastList from '@/components/LinePodcastList.vue';

import YoutubeComponent from '@/components/YoutubeComponent.vue';
import YoutubePolicy from '@/components/YoutubePolicy.vue';
import YoutubeMedia from '@/components/YoutubeMedia.vue';
import YoutubeHeader from '@/components/YoutubeHeader.vue';

import EdmPodcast from '@/components/EdmPodcast.vue';
import WebPushComponent from '@/components/WebPushComponent.vue';
import VideoComponent from '@/components/VideoComponent.vue';
import CwComponent from '@/components/CwComponent.vue';

export default {
  data() {
    return {
      output: {
        width: 1040,
        height: 1040,
        ratio: 1.6507936508,
      },
      social: {
        select: 'line',
        items: [
          {
            value: 'line',
            display: 'LINE',
          },
          // {
          //   value: 'facebook',
          //   display: 'Facebook',
          // },
          {
            value: 'instagram',
            display: 'Instagram',
          },
          {
            value: 'edm',
            display: '電子報',
          },
          {
            value: 'youtube',
            display: 'YouTube',
          },
          {
            value: 'webpush',
            display: 'Web Push',
          },
          {
            value: 'cwvideo',
            display: '天下影音',
          },
          {
            value: 'cw',
            display: '天下官網',
          },
        ],
      },
      type: {
        select: 'line-popular-articles',
      },
      types: [
        {
          value: 'line-popular-articles',
          display: '熱文',
        },
        {
          value: 'line-podcast-cw',
          display: '聽天下',
        },
        {
          value: 'line-podcast-channel',
          display: '闖天下',
        },
        {
          value: 'line-english',
          display: '英網',
        },
        {
          value: 'line-podcast-list',
          display: '聽天下選單',
        },
        {
          value: 'line-weekly-popular',
          display: '本週最熱文章',
        },
        {
          value: 'line-specific-recommendation',
          display: '專屬文章推薦',
        },
      ],
      headers: {
        title: '標題',
        subtitle: '副標',
        content: '內文',
        cta: 'CTA 文字',
      },
      value: {
        img: 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg',
        group: {
          first: {
            img: '',
            title: '',
            limit: 16,
          },
          second: {
            img: '',
            title: '',
            limit: 16,
          },
          third: {
            img: '',
            title: '',
            limit: 16,
          },
          forth: {
            img: '',
            title: '',
            limit: 16,
          },
        },
        title: {
          limit: 30,
          value: '<p>標題一行最多十五個字，需放兩行</p><p>標題一行最多十五個字，需放兩行</p>',
        },
        subtitle: {
          limit: 6,
          value: '今日熱文',
        },
        content: {
          limit: 6,
          value: '內文一行最多放二十三個全形字，可少於不可多於。\n內文最多只能放六行，可少於不可多於，\n內文最多只能放六行，\n內文最多只能放六行，可少於不可多於，\n內文最多只能放六行，\n內文最多只能放六行，到這一行結束。',
        },
        cta: {
          limit: 10,
          value: '上滑\n看完整文章',
        },
        label: {
          limit: 10,
          value: '天下圖擊',
        },
        logo: {
          select: 'images/cw-logo-white-primary.svg',
          disabled: false,
          white: {
            primary: 'images/cw-logo-white-primary.svg',
            black: 'images/cw-logo-white-black.svg',
          },
          transparent: {
            primary: 'images/cw-logo-primary-transparent.svg',
            black: 'images/cw-logo-black-transparent.svg',
            white: 'images/cw-logo-white-transparent.svg',
          },
          video: 'images/cw-video.png',
          podcast: {
            square: {
              cw: 'images/podcast-cw.jpg',
              channel: 'images/podcast-channel.jpg',
            },
            horizontal: {
              cw: 'images/podcast-cw-horizontal.jpg',
              channel: 'images/podcast-channel-horizontal.jpg',
            },
          },
        },
        translate: true,
        live: false,
        align: '靠右對齊',
      },
      editable: {
        switch: false,
        vertical: 0,
        horizontal: 0,
        scale: 1,
        group: {
          first: {
            switch: false,
            vertical: 0,
            horizontal: 0,
            scale: 1,
          },
          second: {
            switch: false,
            vertical: 0,
            horizontal: 0,
            scale: 1,
          },
          third: {
            switch: false,
            vertical: 0,
            horizontal: 0,
            scale: 1,
          },
          forth: {
            switch: false,
            vertical: 0,
            horizontal: 0,
            scale: 1,
          },
        },
      },
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        plugins: [
          Essentials,
          Bold,
          Paragraph,
          Font,
        ],
        toolbar: {
          items: [
            'bold',
            'fontColor',
            '|',
            'undo',
            'redo',
          ],
        },
        fontColor: {
          colors: [
            {
              color: '#d60c18',
              label: '天下紅',
            },
            {
              color: '#a41117',
              label: '聽天下紅',
            },
            {
              color: '#26aae3',
              label: '闖天下藍',
            },
            {
              color: '#fff',
              label: 'White',
              hasBorder: true,
            },
          ],
        },
      },
    };
  },
  components: {
    IgPicture,
    IgQuote,
    IgSummary,
    IgFaq,
    LineComponent,
    LinePodcastList,
    EdmPodcast,
    YoutubeComponent,
    YoutubePolicy,
    YoutubeMedia,
    YoutubeHeader,
    VideoComponent,
    WebPushComponent,
    CwComponent,
  },
  methods: {
    /* eslint-disable */
    screenshot() {
      const el = document.querySelector('#preview');
      let method = 'toPng';
      let extension = 'png';
      let qlty = 1;
      switch (this.type.select) {
        case 'cwvideo-slider':
        case 'cwvideo-list':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = .95;
          break;
        case 'cw-logo':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = .6;
          break;
        case 'line-popular-articles':
        case 'line-podcast-cw':
        case 'line-podcast-channel':
        case 'line-english':
        case 'line-podcast-list':
        case 'line-weekly-popular':
        case 'line-specific-recommendation':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = 1;
          break;
        case 'youtube-enterprise':
        case 'youtube-investigation':
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-forum':
        case 'youtube-policy':
        case 'youtube-media':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = .95;
          break;
        case 'youtube-header':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = .95;
          document.querySelector('.mask').style.display = 'none';
          break;
        case 'webpush':
          method = 'toJpeg';
          extension = 'jpg';
          qlty = .85;
          break;
        default:
          break;
      }
      domtoimage[method](el, {
        quality: qlty,
        width: this.output.width,
        height: this.output.height,
        style: {
          'transform': `scale(${this.output.ratio})`,
          'transform-origin': 'top left',
        },
      })
      .then((dataUrl) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = `${yyyy}${mm}${dd}`;
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${this.type.select}-${today}.${extension}`;
        a.click();
        if ( this.type.select === 'youtube-header' ) {
          document.querySelector('.mask').style.display = 'block';
        }
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    },
    onFileSelected(id = 'file_upload', idx = null, type = 'single') {
      const file = document.querySelector(`#${id}`).files[0];
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        if ( type === 'single' ) {
          this.value.img = rawImg;
        } else if ( type === 'group' ) {
          this.value.group[idx].img = rawImg;
        }
      }
      reader.readAsDataURL(file);
    },
    /* eslint-disable */
    countLines(el) {
      const line = el.split('\n').length;
      return line;
    },
    removeTags(str) {
      if ((str===null) || (str==='')) {
        return false;
      } else {
        str = str.toString();
      }
      return str.replace(/(<([^>]+)>)/ig, '');
    },
    detectType() {
      this.headers.title = '標題';
      this.headers.subtitle = '副標';
      this.headers.content = '內文';
      this.headers.cta = 'CTA 文字';

      switch (this.type.select) {
        case 'ig-cw-picture-story':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.limit = 18;
          this.value.title.value = '<p>大標最多十八個全形字，可少於不可多於</p>';
          this.value.subtitle.limit = 23;
          this.value.subtitle.value = '<p>副標最多放二十三個全形字，可少不可多於二十三字</p>';
          this.value.content.limit = 6;
          this.value.content.value = '內文一行最多放二十三個全形字，可少於不可多於。\n內文最多只能放六行，可少於不可多於，\n內文最多只能放六行，\n內文最多只能放六行，可少於不可多於，\n內文最多只能放六行，\n內文最多只能放六行，到這一行結束。';
          this.value.cta.value = '上滑\n看完整文章';
          this.value.label.value = '天下圖擊';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-cw-picture-post':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.limit = 18;
          this.value.title.value = '<p>大標最多十八個全形字，可少於不可多於</p>';
          this.value.subtitle.limit = 23;
          this.value.subtitle.value = '<p>副標最多放二十三個全形字，可少不可多於二十三字</p>';
          this.value.cta.value = '到限時動態查看';
          this.value.label.value = '天下圖擊';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          break;
        case 'ig-summary-post':
          this.value.title.limit = 25;
          this.value.title.value = '《書名請在這裡改，書名在這裡改》';
          this.value.content.limit = 4;
          this.value.content.value = '書摘金句一行最多可放到十七個全形字\n包含標點。可少於、不可多於十七字。\n最多可放到四行，\n可少於不可多於四行。不可多於四行。';
          this.value.logo.select = this.value.logo.white.black;
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          this.headers.title = '書名';
          break;
        case 'ig-summary-story':
          this.value.title.limit = 25;
          this.value.title.value = '《書名請在這裡改，書名在這裡改》';
          this.value.content.limit = 4;
          this.value.content.value = '書摘金句一行最多可放到十七個全形字\n包含標點。可少於、不可多於十七字。\n最多可放到四行，\n可少於不可多於四行。不可多於四行。';
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          this.headers.title = '書名';
          break;
        case 'ig-quote-story':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.limit = 24;
          this.value.title.value = '——職銜與人名放這一行';
          this.value.content.limit = 3;
          this.value.content.value = '金句限動一行最多可放十六個全形字\n包含標點。可少於、不可多於十七字\n最多可放到三行，不可多於三行。';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          this.headers.title = '職銜與人名';
          break;
        case 'ig-quote-post':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 24;
          this.value.title.value = '——職銜與人名放這一行';
          this.value.content.limit = 36;
          this.value.content.value = '「金句一行最多十八個全形字（含標點符號）最多兩行字，可少於、不可多於。」';
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          this.headers.title = '職銜與人名';
          break;
        case 'ig-faq-word-story':
          this.value.title.limit = 18;
          this.value.title.value = '<p>大標最多十八個全形字，可少於不可多於</p>';
          this.value.subtitle.limit = 23;
          this.value.subtitle.value = '<p>副標最多放二十三個全形字，可少不可多於二十三字</p>';
          this.value.content.limit = 23;
          this.value.content.value = '內文最多放二十二個全形字，可少不可多於二二字';
          this.value.label.value = '猜一猜';
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-faq-picture-story':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.limit = 30;
          this.value.title.value = '問題大標一行可放十五個全形字，\n包含標點。而且需要兩行。';
          this.value.content.limit = 22;
          this.value.content.value = '題目這一行最多可放二十二個全形字，只可以一行';
          this.value.label.value = '猜一猜';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'line-popular-articles':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 30;
          this.value.title.value = '<p>標題一行最多十五個字，需放兩行</p><p>標題一行最多十五個字，需放兩行</p>';
          this.value.subtitle.limit = 6;
          this.value.subtitle.value = '今日熱文';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-cw':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.podcast.square.cw;
          this.value.title.limit = 26;
          this.value.title.value = '<p>這行標題最多十五個字，需有兩行這行標題最多十一個字。</p>';
          this.value.subtitle.limit = 10;
          this.value.subtitle.value = '聽天下｜聰明慢老';
          this.value.cta.limit = 4;
          this.value.cta.value = '點擊收聽';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-channel':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.podcast.square.channel;
          this.value.title.limit = 26;
          this.value.title.value = '<p>這行標題最多十五個字，需有兩行這行標題最多十一個字。</p>';
          this.value.subtitle.limit = 10;
          this.value.subtitle.value = '闖天下｜服務一點訣';
          this.value.cta.limit = 4;
          this.value.cta.value = '點擊收聽';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-english':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 90;
          this.value.title.value = '<p>The \'Prosperous 100\' leading Taiwan\'s, semiconductor industry into.</p>';
          this.value.subtitle.limit = 27;
          this.value.subtitle.value = '此處輸入中文標題，一行最多可放到二十七字，只可以放一行';
          this.value.cta.limit = 9;
          this.value.cta.value = 'Read More';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-list':
          this.value.logo.select = this.value.logo.podcast.square.cw;

          this.value.group.first.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202102/article-603370ada2849.jpg';
          this.value.group.first.title = '一行標題最多可放十二個字\n一行標題最多可放十二個字';
          this.value.group.first.limit = 24;

          this.value.group.second.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-63513f3a131b8.jpg';
          this.value.group.second.title = '一行標題最多可放十二個字\n一行標題最多可放十二個字';
          this.value.group.second.limit = 24;

          this.value.group.third.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202209/article-63195fc1a5e82.jpg';
          this.value.group.third.title = '一行標題最多可放十二個字\n一行標題最多可放十二個字';
          this.value.group.third.limit = 24;

          this.value.group.forth.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202206/article-62b45f8ee4206.jpg';
          this.value.group.forth.title = '一行標題最多可放十二個字\n一行標題最多可放十二個字';
          this.value.group.forth.limit = 24;
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-weekly-popular':
          this.value.logo.select = this.value.logo.white.primary;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.limit = 30;
          this.value.title.value = '<p>標題一行最多十五個字，需放兩行</p><p>標題一行最多十五個字，需放兩行</p>';
          this.value.subtitle.limit = 6;
          this.value.subtitle.value = '本週最熱文章';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-specific-recommendation':
          this.value.logo.select = this.value.logo.white.primary;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.title.value = '此行標題最多放十五個字，需兩行\n此行標題最多放十個字';
          this.value.title.limit = 25;
          this.value.subtitle.value = '專屬文章推薦';
          this.value.subtitle.limit = 6;
          this.value.cta.value = '24hr限時解鎖';
          this.value.cta.limit = 6;
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'edm-economist-podcast':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202201/article-61d2f309ba56c.jpg';
          this.value.logo.select = this.value.logo.podcast.square.cw;
          this.value.label.limit = 8;
          this.value.label.value = '聽天下｜經濟學人';
          this.value.title.limit = 30;
          this.value.title.value = '這行標題最多十五個字，需有兩行\n這行標題最多十五個字，需有兩行';
          this.value.cta.limit = 4;
          this.value.cta.value = '點擊收聽';
          this.output.width = 1600;
          this.output.height = 1072;
          this.output.ratio = 2.6666666667;
          break;
        case 'youtube-enterprise':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202112/article-61b8060a2a536.jpg';
          this.value.title.value = '<p>此行細標最多放十一個字<br><strong>此行粗標最多放十一個字</strong></p>';
          this.value.title.limit = 22;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-investigation':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/ckeditor/202112/ckeditor-61c1ac59096f2.jpg';
          this.value.title.value = '<p>此行細標最多放十一個字<br><strong>此行粗標最多放十一個字</strong></p>';
          this.value.title.limit = 22;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-interview':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-6357565497cf4.jpg';
          this.value.title.value = '<p>此行細標最多放十一個字<br><strong>此行粗標最多放十一個字</strong></p>';
          this.value.title.limit = 22;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-podcast':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-635755f6c18cf.jpg';
          this.value.title.value = '<p>此行細標最多放十一個字<br><strong>此行粗標最多放九字</strong></p>';
          this.value.title.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-sustainable':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/ckeditor/202112/ckeditor-61b80c7da710c.jpg';
          this.value.title.value = '<p><strong>此行粗標最多放十一個字</strong></p><p>此行細標最多放十一個字</p>';
          this.value.title.limit = 22;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-forum':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/201911/article-5dd3dc713e8d6.jpg';
          this.value.title.value = '<p><strong>此行粗標最多放十一個字</strong><br>此行細標最多放十一個字</p>';
          this.value.title.limit = 22;
          this.value.subtitle.value = '小帽最多放八個字';
          this.value.subtitle.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-policy':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202209/article-63171a06e5602.JPG';
          this.value.title.value = '<p><strong>此行粗標最多放十個字</strong></p>';
          this.value.title.limit = 10;
          this.value.subtitle.value = '此行細標最多放九字';
          this.value.subtitle.limit = 9;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-media':
          this.value.logo.select = this.value.logo.video;
          this.value.group.first.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202206/purchase-reauisition-62a6eec84f48b.jpg';
          this.value.group.second.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202001/article-5e1ee2d2ab56e.jpg';
          this.value.group.third.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-6357893b24fcf.png';

          this.value.title.value = '<p>此行細標最多放九字<strong><br/>此行粗標最多放九字</strong></p>';
          this.value.title.limit = 18;
          this.headers.subtitle = '合作媒體';
          this.value.subtitle.value = '天下 ✕ TVBS';
          this.value.subtitle.limit = 9;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-header':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-63579cda66bbb.jpg';
          this.value.title.value = '<p><strong>此行標最多八個字<br/>此行標最多八個字</strong></p>';
          this.value.title.limit = 16;
          this.output.width = 2560;
          this.output.height = 1440;
          this.output.ratio = 4;
          break;
        case 'webpush':
          this.value.logo.select = this.value.logo.white.primary;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202207/purchase-reauisition-62de4445582be.jpg';
          this.value.title.value = '一行四字\n限定兩行';
          this.value.title.limit = 8;
          this.value.subtitle.value = '副標可有可無九字內';
          this.value.subtitle.limit = 9;
          this.output.width = 1024;
          this.output.height = 512;
          this.output.ratio = 1.7066666667;
          break;
        case 'cwvideo-slider':
          this.output.width = 940;
          this.output.height = 584;
          this.output.ratio = 1.5384615385;
          break;
        case 'cwvideo-list':
          this.output.width = 600;
          this.output.height = 373;
          this.output.ratio = 1;
          break;
        case 'cw-logo':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202210/article-633ce45a09679.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1600;
          this.output.height = 1072;
          this.output.ratio = 2.6666666667;
          break;
        default:
          break;
      }
      console.log('Change');
    },
    checkEditor() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-quote-post':
        case 'ig-quote-story':
        case 'ig-faq-picture-story':
        case 'line-specific-recommendation':
        case 'edm-economist-podcast':
        case 'webpush':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkSingleLine() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-quote-post':
        case 'ig-quote-story':
        case 'line-popular-articles':
        case 'line-podcast-cw':
        case 'line-podcast-channel':
        case 'line-english':
        case 'line-weekly-popular':
        case 'line-specific-recommendation':
        case 'youtube-forum':
          return true;
          break;
        default:
          return false;
          break;
      }
    },
    checkMultiLine() {
      switch (this.type.select) {
        case 'ig-quote-post':
        case 'ig-faq-word-story':
        case 'ig-faq-picture-story':
          return true;
          break;
        default:
          return false;
          break;
      }
    },
    checkImg() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-faq-word-story':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkTitle() {
      switch (this.type.select) {
        case 'cwvideo-slider':
        case 'cwvideo-list':
        case 'cw-logo':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkSubtitle() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-quote-post':
        case 'ig-quote-story':
        case 'ig-faq-picture-story':
        case 'edm-economist-podcast':
        case 'youtube-enterprise':
        case 'youtube-investigation':
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-header':
        case 'cwvideo-slider':
        case 'cwvideo-list':
        case 'cw-logo':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkContent() {
      switch (this.type.select) {
        case 'ig-cw-picture-post':
        case 'line-popular-articles':
        case 'line-podcast-cw':
        case 'line-podcast-channel':
        case 'line-english':
        case 'line-podcast-list':
        case 'line-weekly-popular':
        case 'line-specific-recommendation':
        case 'edm-economist-podcast':
        case 'youtube-enterprise':
        case 'youtube-investigation':
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-forum':
        case 'youtube-policy':
        case 'youtube-header':
        case 'webpush':
        case 'cwvideo-slider':
        case 'cwvideo-list':
        case 'cw-logo':
          return false
          break;
        default:
          return true;
          break;
      }
    },
    checkCta() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-quote-post':
        case 'ig-faq-word-story':
        case 'ig-faq-picture-story':
        case 'line-popular-articles':
        case 'line-weekly-popular':
        case 'youtube-enterprise':
        case 'youtube-investigation':
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-forum':
        case 'youtube-policy':
        case 'youtube-header':
        case 'webpush':
        case 'cwvideo-slider':
        case 'cwvideo-list':
        case 'cw-logo':
        return false
          break;
        default:
          return true;
          break;
      }
    },
    checkLogo() {
      switch (this.type.select) {
        case 'ig-cw-picture-post':
        case 'ig-cw-picture-story':
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-quote-story':
        case 'ig-faq-word-story':
        case 'ig-faq-picture-story':
        case 'line-popular-articles':
        case 'line-podcast-cw':
        case 'line-podcast-channel':
        case 'line-english':
        case 'line-weekly-popular':
        case 'line-specific-recommendation':
        case 'edm-economist-podcast':
        case 'youtube-enterprise':
        case 'youtube-investigation':
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-forum':
        case 'youtube-policy':
        case 'youtube-media':
        case 'youtube-header':
        case 'webpush':
        case 'cwvideo-slider':
        case 'cwvideo-list':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkAd() {
      switch (this.type.select) {
        case 'youtube-interview':
        case 'youtube-podcast':
        case 'youtube-sustainable':
        case 'youtube-forum':
          return true;
          break;
        default:
          return false;
          break;
      }
    },
  },
  watch: {
    'social.select': function select() {
      switch (this.social.select) {
        case 'line':
          this.types = [
            {
              value: 'line-popular-articles',
              display: '熱文',
            },
            {
              value: 'line-podcast-cw',
              display: '聽天下',
            },
            {
              value: 'line-podcast-channel',
              display: '闖天下',
            },
            {
              value: 'line-english',
              display: '英網',
            },
            {
              value: 'line-podcast-list',
              display: '聽天下選單',
            },
            {
              value: 'line-weekly-popular',
              display: '本週最熱文章',
            },
            {
              value: 'line-specific-recommendation',
              display: '專屬文章推薦',
            },
          ];
          this.type.select = 'line-popular-articles';
          break;
        case 'instagram':
          this.types = [
            {
              value: 'ig-cw-picture-post',
              display: '天下圖擊圖卡',
            },
            {
              value: 'ig-cw-picture-story',
              display: '天下圖擊限動',
            },
            {
              value: 'ig-summary-post',
              display: '書摘圖卡（金句類）',
            },
            {
              value: 'ig-summary-story',
              display: '書摘限時動態',
            },
            {
              value: 'ig-quote-post',
              display: '金句圖卡',
            },
            {
              value: 'ig-quote-story',
              display: '金句限動',
            },
            {
              value: 'ig-faq-word-story',
              display: '問答限動（文字版）',
            },
            {
              value: 'ig-faq-picture-story',
              display: '問答限動（有圖版）',
            },
          ];
          this.type.select = 'ig-cw-picture-post';
          break;
        case 'edm':
          this.types = [
            {
              value: 'edm-economist-podcast',
              display: '經濟學人聽天下首圖',
            },
          ];
          this.type.select = 'edm-economist-podcast';
          break;
        case 'youtube':
          this.types = [
            {
              value: 'youtube-enterprise',
              display: '企業類型',
            },
            {
              value: 'youtube-investigation',
              display: '調查報導',
            },
            {
              value: 'youtube-interview',
              display: '人物專訪',
            },
            {
              value: 'youtube-podcast',
              display: 'Podcast',
            },
            {
              value: 'youtube-sustainable',
              display: '永續報導',
            },
            {
              value: 'youtube-forum',
              display: '論壇精華',
            },
            {
              value: 'youtube-policy',
              display: '政令宣導',
            },
            {
              value: 'youtube-media',
              display: '媒體合作',
            },
            {
              value: 'youtube-header',
              display: 'YT 首頁 Banner',
            },
          ];
          this.type.select = 'youtube-enterprise';
          break;
        case 'webpush':
          this.types = [
            {
              value: 'webpush',
              display: '推播版型',
            },
          ];
          this.type.select = 'webpush';
          break;
        case 'cwvideo':
          this.types = [
            {
              value: 'cwvideo-slider',
              display: 'Slider',
            },
            {
              value: 'cwvideo-list',
              display: '列表圖',
            },
          ];
          this.type.select = 'cwvideo-slider';
          break;
        case 'cw':
          this.types = [
            {
              value: 'cw-logo',
              display: '主圖壓 Logo',
            },
          ];
          this.type.select = 'cw-logo';
          break;
        default:
          this.types = [];
          break;
      }
    },
  },
};
</script>

<style lang="scss">
body main p {
  font-size: inherit;
  margin-top: 0;
  margin-bottom: 0;
}
.ck.ck-content {
  height: auto;
}
</style>
<style lang="scss" scoped>
.form__group--ckeditor {
  .form__group__placeholder {
    top: 3rem;
    z-index: 1;
  }
}
</style>
