<template>
  <div class="container">
    <div class="row">
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
        <div class="mb20" v-if="checkImg()">
          <h3 class="mb-0">上傳檔案</h3>
          <template v-if="type.select !== 'line-podcast-list'">
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
          </template>
          <template v-if="type.select === 'line-podcast-list'">
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
          </template>
          <template v-if="type.select === 'line-podcast-list'">
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
          </template>
          <template v-if="type.select === 'line-podcast-list'">
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
          </template>
          <template v-if="type.select === 'line-podcast-list'">
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
          </template>
        </div>
        <div
          class="form__group form__group--ckeditor w-100 mb20"
          v-if="checkTitle() && checkEditor()"
        >
          <h3 class="mb-0">標題</h3>
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
          class="form__group form__group--ckeditor w-100 mb20"
          v-else-if="checkTitle()"
        >
          <h3 class="mb-0">標題</h3>
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
          <h3 class="mb-0">副標</h3>
          <div
            class="label form__group--defalt"
            :class="{
              'form__group--error': removeTags(value.subtitle.value).length > value.subtitle.limit,
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
          <h3 class="mb-0">副標</h3>
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
          <h3 class="mb-0">副標</h3>
          <div class="label form__group--defalt">
            <textarea v-model="value.subtitle.value" class="form__group__input d-block"></textarea>
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
        <div class="form__group form__group--outlined w-100 mb20" v-if="checkContent()">
          <h3 class="mb-1">內文</h3>
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
        <div class="form__group form__group--outlined w-100 mb20" v-if="checkCta()">
          <h3 class="mb-1">CTA 文字</h3>
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
        <div class="form__logos mb20" v-if="checkLogo()">
          <h3 class="mb-1">選擇 Logo 樣式</h3>
          <div
            v-if="type.select !== 'line-podcast-list'"
            class="row mt-2"
          >
            <div class="col-md-3">
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
            <div class="col-md-3">
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
            <div class="col-md-3">
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
            <div class="col-md-3">
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
          </div>
          <div
            v-if="type.select === 'line-podcast-list'"
            class="row mt-2"
          >
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-podcast-horizontal-cw"
                  :value="value.logo.podcast.horizontal.cw"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.podcast.horizontal.cw"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/podcast-cw-horizontal.jpg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-podcast-horizontal-channel"
                  :value="value.logo.podcast.horizontal.channel"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.podcast.horizontal.channel"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/podcast-channel-horizontal.jpg" alt="">
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
      <div class="col-md-6 d-flex flex-column align-items-center">
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
          v-if="type.select.indexOf('youtube-') > -1"
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

import EdmPodcast from '@/components/EdmPodcast.vue';
import YoutubeComponent from '@/components/YoutubeComponent.vue';
import VideoComponent from '@/components/VideoComponent.vue';
import CwComponent from '@/components/CwComponent.vue';

export default {
  data() {
    return {
      output: {
        width: 1080,
        height: 1920,
        ratio: 2,
      },
      social: {
        select: 'instagram',
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
        select: 'ig-cw-picture-story',
      },
      types: [
        {
          value: 'ig-cw-picture-post',
          display: '天下圖擊圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-cw-picture-story',
          display: '天下圖擊限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-summary-post',
          display: '書摘圖卡（金句類）',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-summary-story',
          display: '書摘限時動態',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-quote-post',
          display: '金句圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-quote-story',
          display: '金句限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-faq-word-story',
          display: '問答限動（文字版）',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-faq-picture-story',
          display: '問答限動（有圖版）',
          size: {
            w: 1080,
            h: 1920,
          },
        },
      ],
      value: {
        img: 'https://storage.googleapis.com/www-cw-com-tw/article/202206/article-62ba6d9c751c6.jpg',
        group: {
          first: '',
          second: '',
          third: '',
          forth: '',
        },
        title: {
          limit: 19,
          value: '<p>房租隨房價飆、政府統計卻躺平</p>',
        },
        subtitle: {
          limit: 19,
          value: '<p>溫和通膨陷阱1》<span style="color:#d60c18;">30到45歲</span>最慘</p>',
        },
        content: {
          limit: 10,
          value: '疫情與戰爭，讓全球通膨怪獸已經失控，\n台灣雖號稱處於溫和通膨，\n但這其實是個假象，\n將造成台灣貧富差距擴大、\n窮人更難翻身。\n\n房租漲幅失真、政府不再撒幣，\n通膨實況到底如何',
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
    VideoComponent,
    CwComponent,
  },
  methods: {
    /* eslint-disable */
    screenshot() {
      const el = document.querySelector('#preview');
      domtoimage.toPng(el, {
        quality: 1,
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
          a.download = `${this.type.select}-${today}.png`;
          a.click();
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
          this.value.group[idx] = rawImg;
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
      switch (this.type.select) {
        case 'ig-cw-picture-story':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202206/article-62ba6d9c751c6.jpg';
          this.value.title.limit = 19;
          this.value.title.value = '<p>房租隨房價飆、政府統計卻躺平</p>';
          this.value.subtitle.limit = 19;
          this.value.subtitle.value = '<p>溫和通膨陷阱1》<span style="color:#d60c18;">30到45歲</span>最慘</p>';
          this.value.content.value = '疫情與戰爭，讓全球通膨怪獸已經失控，\n台灣雖號稱處於溫和通膨，\n但這其實是個假象，\n將造成台灣貧富差距擴大、\n窮人更難翻身。\n\n房租漲幅失真、政府不再撒幣，\n通膨實況到底如何';
          this.value.cta.value = '上滑\n看完整文章';
          this.value.label.value = '天下圖擊';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-cw-picture-post':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202111/purchase-reauisition-619205a3e6711.jpg';
          this.value.title.limit = 19;
          this.value.title.value = '<p>中國<span style="color:#d60c18;">米兔</span>VS.西方<span style="color:#d60c18;">#MeToo</span> 為何命運大不同？</p>';
          this.value.subtitle.limit = 19;
          this.value.subtitle.value = '<p>彭帥指控中國前副總理性侵後人間蒸發</p>';
          this.value.cta.value = '到限時動態查看';
          this.value.label.value = '天下圖擊';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          break;
        case 'ig-summary-post':
          this.value.title.limit = 25;
          this.value.title.value = '《懂權力，在每個角色上發光》';
          this.value.content.limit = 19;
          this.value.content.value = '提防那些對你很特別，同時卻對其他人表現出不尊重或幾近鄙視的人。當你無法滿足他們的需求時，他們就不再重視你，還會貶低你。';
          this.value.logo.select = this.value.logo.white.black;
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          break;
        case 'ig-summary-story':
          this.value.title.limit = 25;
          this.value.title.value = '《懂權力，在每個角色上發光》';
          this.value.content.limit = 13;
          this.value.content.value = '做得多、會的多，並不值得驕傲，有自己最具競爭力的特長和優勢，才值得大聲說話。';
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-quote-story':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202112/article-61cd3acbb7c9a.jpg';
          this.value.title.limit = 25;
          this.value.title.value = '–AIA國際設計獎得主/建築師 張淑征';
          this.value.content.limit = 13;
          this.value.content.value = '我希望每天都學一樣新的東西，很廢的也沒關係，要永遠保持好奇心。';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-quote-post':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202111/purchase-reauisition-617f92e81195c.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 26;
          this.value.title.value = '—台泥董事長 張安平';
          this.value.content.limit = 36;
          this.value.content.value = '「有道德的生意，才會是好生意。」';
          this.output.width = 1080;
          this.output.height = 1080;
          this.output.ratio = 2;
          break;
        case 'ig-faq-word-story':
          this.value.title.limit = 19;
          this.value.title.value = '<p><span style="color:#d60c18;">軍事支出</span>佔GDP比重，比台灣還要高？</p>';
          this.value.subtitle.limit = 19;
          this.value.subtitle.value = '<p>下列哪一個國家</p>';
          this.value.content.value = '小編七點半準時公佈解答喔！';
          this.value.label.value = '猜一猜';
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'ig-faq-picture-story':
          this.value.img = 'http://m.niusnews.com/upload/posts/posts_image3_105708_1618825479.jpg';
          this.value.title.value = '哥吉拉公仔別亂送！\n日本影史最經典怪獸知多少？';
          this.value.content.value = 'Ｑ１：哥吉拉的名稱是哪兩種動物組合而成？';
          this.value.label.value = '猜一猜';
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1080;
          this.output.height = 1920;
          this.output.ratio = 2;
          break;
        case 'line-popular-articles':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202205/article-627cd47ec6cd4.jpg';
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 30;
          this.value.title.value = '<p>景氣反轉成定局，</p><p>通膨會不會殺了全球經濟？</p>';
          this.value.subtitle.limit = 6;
          this.value.subtitle.value = '今日熱文';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-cw':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202006/article-5ee5c6c8ed334.jpg';
          this.value.logo.select = this.value.logo.podcast.square.cw;
          this.value.title.value = '<p>輾轉難眠，換個方向就能入睡？為什麼中年之後總是睡不好？提升睡眠品質的訣竅！</p>';
          this.value.subtitle.value = '聽天下｜聰明慢老';
          this.value.cta.value = '點擊收聽';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-channel':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202109/article-615421490e479.JPG';
          this.value.logo.select = this.value.logo.podcast.square.channel;
          this.value.title.value = '<p>網紅開團購一定有效？</p><p>不拚價格，找對KOL賣認同！</p>';
          this.value.subtitle.value = '闖天下｜服務一點訣';
          this.value.cta.value = '點擊收聽';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-english':
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-podcast-list':
          this.value.logo.select = this.value.logo.podcast.square.cw;
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-weekly-popular':
          this.value.logo.select = this.value.logo.white.primary;
          this.value.title.limit = 26;
          this.value.title.value = '<p>主標第一行最多只能放十五個字</p><p>第二行最多只放十一個字</p>';
          this.value.subtitle.limit = 6;
          this.value.subtitle.value = '本週最熱文章';
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'line-specific-recommendation':
          this.value.logo.select = this.value.logo.white.primary;
          this.output.width = 1040;
          this.output.height = 1040;
          this.output.ratio = 1.6507936508;
          break;
        case 'edm-economist-podcast':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202201/article-61d2f309ba56c.jpg';
          this.value.logo.select = this.value.logo.podcast.square.cw;
          this.value.label.value = '聽天下｜經濟學人';
          this.value.title.value = '兩極分化下的美國政局；\n全球資本從氾濫到稀缺？';
          this.value.cta.value = '點擊收聽';
          this.output.width = 1600;
          this.output.height = 1072;
          this.output.ratio = 2.6666666667;
          break;
        case 'youtube-enterprise':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202112/article-61b8060a2a536.jpg';
          this.value.title.value = '<p>有望成為Omicron剋星？<br><strong>翁啟惠首創廣效疫苗</strong></p>';
          this.value.title.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-investigation':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/ckeditor/202112/ckeditor-61c1ac59096f2.jpg';
          this.value.title.value = '<p>免費填土？<br><strong>老農遭詐騙，失智加重</strong></p>';
          this.value.title.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-interview':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/video/202112/video-61add88c2d23a.jpg';
          this.value.title.value = '<p>上台前差點昏倒？<br><strong>薛仕凌：我是一個普通人</strong></p>';
          this.value.title.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-podcast':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/201904/article-5cac09448813e.JPG';
          this.value.title.value = '<p>排華受害者走出悲憤<br><strong>成為移工支柱</strong></p>';
          this.value.title.limit = 18;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-sustainable':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/ckeditor/202112/ckeditor-61b80c7da710c.jpg';
          this.value.title.value = '<p><strong>邀請每一份積極的力量</strong><br>發揮對未來的影響力</p>';
          this.value.title.limit = 18;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'youtube-forum':
          this.value.logo.select = this.value.logo.video;
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/201911/article-5dd3dc713e8d6.jpg';
          this.value.title.value = '<p><strong>邀請每一份積極的力量</strong><br>發揮對未來的影響力</p>';
          this.value.title.limit = 22;
          this.value.subtitle.value = 'SDGs國際論壇#14';
          this.value.subtitle.limit = 20;
          this.output.width = 1920;
          this.output.height = 1080;
          this.output.ratio = 3;
          break;
        case 'webpush-webaccess':
          break;
        case 'webpush-covid19':
          break;
        case 'cwvideo-slider':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/video/202209/video-633119ed8f0a7.jpg';
          this.output.width = 940;
          this.output.height = 584;
          this.output.ratio = 2.6;
          break;
        case 'cwvideo-list':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/video/202209/video-633119ed8f0a7.jpg';
          this.output.width = 600;
          this.output.height = 373;
          this.output.ratio = 1;
          break;
        case 'cw-logo':
          this.value.img = 'https://storage.googleapis.com/www-cw-com-tw/article/202209/article-632dd2f8a4273.jpg';
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
        case 'edm-economist-podcast':
          return false;
          break;
        default:
          return true;
          break;
      }
    },
    checkSingleLine() {
      switch (this.type.select) {
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
          ];
          this.type.select = 'youtube-enterprise';
          break;
        case 'webpush':
          this.types = [
            {
              value: 'webpush-webaccess',
              display: '訂戶專屬',
            },
            {
              value: 'webpush-covid19',
              display: '疫情更新',
            },
          ];
          this.type.select = 'webpush-webaccess';
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
.line-podcast-channel {
  background: top center/contain url('@/assets/images/test@2x.png');
}
</style>
