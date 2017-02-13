import React from 'react'
import './style.scss'

class TaskOpinion extends React.Component {

  static propTypes = {
    lang: React.PropTypes.string,
    process: React.PropTypes.string
  }

  componentWillMount () {
    $.fn.extend({
      autoHeight: function () {
        function autoHeight_ (element) {
          return $(element)
            .css({'height': 'auto', 'overflow-y': 'hidden'})
            .height(element.scrollHeight - 10)
        }
        return this.each(function () {
          autoHeight_(this).on('input', function () {
            autoHeight_(this)
          })
        })
      }
    })
  }

  componentDidMount () {
    this.initTypehead()
    this.initEvent()
  }

  initEvent () {
    let component = this

    $('.task-opinion').on('mousedown', '.opinion-save', function (event) {
      event.stopPropagation()
      $.ajax({
        url: '/qdp/qdp/payment/bpm/opinion/add?' + new Date().getTime(),
        type: 'POST',
        dataType: 'json',
        data: {comment: $(component.refs.opinion).typeahead('val')}
      })
      .done(function () {
        $(component.refs.opinion).typeahead('close')
        $(component.refs.opinion).typeahead('destroy')
        component.initTypehead()
        $(component.refs.opinion).trigger('keyup')
      })
    })

    $('.task-opinion').on('mousedown', '.opinion-delete', function (event) {
      event.stopPropagation()
      $.ajax({
        url: '/qdp/qdp/payment/bpm/opinion/delete?' + new Date().getTime(),
        type: 'POST',
        dataType: 'json',
        data: {opinionId: $(this).prev('.opinion-content').data('id')}
      })
      .done(function () {
        $(component.refs.opinion).typeahead('close')
        $(component.refs.opinion).typeahead('destroy')
        component.initTypehead()
        $(component.refs.opinion).trigger('keyup')
      })
    })

    $(this.refs.opinion).on('keyup', function (event) {
      $(this).autoHeight()
    })
  }

  initTypehead () {
    var engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '/qdp/qdp/payment/bpm/opinion/query?' + new Date().getTime(),
      identify: function (obj) {
        return obj.title
      }
    })

    // 设置默认的意见
    function engineWithDefaults (q, sync, async) {
      if (q === '') {
        // 加载默认的意见
        if (this.props.process && this.props.process !== '') {
          engine.add($.opinions.defaultOpinions[this.props.process])
          sync($.opinions.defaultOpinions[this.props.process])
        }
      } else {
        engine.search(q, sync)
      }
    }

    $(this.refs.opinion).typeahead({
      minLength: 0,
      hint: false,
      highlight: true
    }, {
      name: 'opinions',
      source: engineWithDefaults.bind(this),
      display: 'title',
      templates: {
        suggestion: function (obj) {
          var $dom = $('<div><span class="opinion-content" data-id="' + obj.id + '"style="width:90%">' +
           obj.title + '</span></div>')
          if (obj.id) {
            $dom.find('opinion-content').data('id', obj.id)
          }
          if (obj.type === 2) {
            $dom.append('<span class="opinion-btn opinion-delete glyphicon glyphicon-minus"></span>')
          }
          return $dom
        }
      }
    })
  }

  render () {
    return (
      <div className='task-opinion'>
        <textarea ref='opinion' className='form-control opinion-input' rows={1} style={{width: '100%'}} />
        <span className='opinion-btn opinion-save glyphicon glyphicon-floppy-disk' type='button' />
      </div>
    )
  }
}

export default TaskOpinion
