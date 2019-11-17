Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        thumb_mode: {
            type: String,
            value: 'aspectFit'
        },
        title: {
            type: String,
            value: ''
        },
        extra_tag: {
            type: String,
            value: ''
        },
      extra_comment:{
        type: Object,
        value:''
      }
    }
});
