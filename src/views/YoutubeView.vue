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
        <template v-if="type.select === 'youtube-media'">
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
      </div>
      <div
        class="col-md-6 d-flex flex-column align-items-center position-sticky top-0 start-0"
      >
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

import YoutubeComponent from '@/components/YoutubeComponent.vue';
import YoutubePolicy from '@/components/YoutubePolicy.vue';
import YoutubeMedia from '@/components/YoutubeMedia.vue';
import YoutubeHeader from '@/components/YoutubeHeader.vue';

export default {
  data() {
    return {
      output: {
        width: 1920,
        height: 1080,
        ratio: 3,
      },
      social: {
        select: 'youtube',
        items: [
          {
            value: 'youtube',
            display: 'YouTube',
          },
        ],
      },
      type: {
        select: 'youtube-enterprise',
      },
      types: [
        {
          value: 'youtube-enterprise',
          display: '企業類型',
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
      ],
      headers: {
        title: '標題',
        subtitle: '副標',
        content: '內文',
        cta: 'CTA 文字',
      },
      value: {
        img: 'https://storage.googleapis.com/www-cw-com-tw/article/202112/article-61b8060a2a536.jpg',
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
          limit: 22,
          value: '<p>此行細標最多放十一個字<br><strong>此行粗標最多放十一個字</strong></p>',
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
          disabled: true,
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
    YoutubeComponent,
    YoutubePolicy,
    YoutubeMedia,
    YoutubeHeader,
  },
  created() {
    if (!this.$cookies.get('cw-banner-generator-editorial-logged')) {
      this.$router.push({
        path: '/',
      });
    }
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
        default:
          break;
      }
    },
    checkEditor() {
      switch (this.type.select) {
        case 'ig-summary-post':
        case 'ig-summary-story':
        case 'ig-quote-post':
        case 'ig-quote-story':
        case 'ig-faq-picture-story':
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
  },
  watch: {
    'social.select': function select() {
      switch (this.social.select) {
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
            // {
            //   value: 'youtube-policy',
            //   display: '政令宣導',
            // },
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
        default:
          this.types = [];
          break;
      }
      this.detectType();
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
