const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
  function getInstanceById(id) {
    const p5Instances = window['p5Instances'] || [];
    for (let i = 0; i < p5Instances.length; i++) {
      const instance = p5Instances[i];
      const element = instance._elements.find(el => el.elt.id === id);
      if (element) {
        return element.elt;
      }
    }
    return null;
  }
  function sendSliderValues(sketchy) {
    function meow(){
      window.postMessage({
        type: 'sliderValues',
        amplitude: sketchy.amplitudeSlider.value(),
        frequency: sketchy.freqSlider.value()
      }, '*');

    }
    return meow
    // Send a message containing the slider values to the other sketch
    
  }