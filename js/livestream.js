$(function() {
$(document)
    .ready(
        function() {
          Highcharts.setOptions({
            global : {
              useUTC : false
            }
          });
          var liveStreams
          var liveStreamsLastWeek
          var chart;
          var totalVideos = 0
          $('#live-platforms')
              .highcharts(
                  {
                    chart : {
                      type : 'spline',
                      animation : Highcharts.svg, // don't animate in old IE
                      marginRight : 10,
                      backgroundColor: '#fbfcfd', // '#eff1f6',
                      events : {
                        load : function() {

                          // set up the updating of the chart each 5 second
                          var series = this.series[0];
                          var series2 = this.series[1];
                          var series3 = this.series[2];
                          var series4 = this.series[3];
                          var series5 = this.series[4];
                          setInterval(
                              function() {
                                var x = (new Date()).getTime(), // current time
                                y = Math.floor((Math.random() * (450)+1) + 8800),
                                z = Math.floor((Math.random() * (300)+1) + 8000),
                                a = Math.floor((Math.random() * (480)+1) + 5400),
                                b = Math.floor((Math.random() * (250)+1) + 6000),
                                c = Math.floor((Math.random() * (380)+1) + 11000);
                                series.addPoint([x,y],false,true);
                                series2.addPoint([x,z], true,true);
                                series3.addPoint([x,a], true,true);
                                series4.addPoint([x,b], true,true);
                                series5.addPoint([x,c], true,true);
                                liveStreams = y + z + a + b
                                //$('#live-streams').text(addCommas(liveStreams))
                                //make up some numbers for last week
                                var e = Math.floor((Math.random() * (90-80)+1) + 80),
                                f =  Math.floor((Math.random() * (90-80)+1) + 80),
                                g = Math.floor((Math.random() * (490-480)+1) + 480),
                                h = Math.floor((Math.random() * (390-380)+1) + 380);
                                i = Math.floor((Math.random() * (380-370)+1) + 370);
                                liveStreamsLastWeek = e+f+g+h
                                $('#change-from-last-week-streams').text(((liveStreams - liveStreamsLastWeek)/liveStreamsLastWeek).toFixed(2))*100
                                //$("#live-users").text(addCommas(liveStreams+38))
                                if (totalVideos < 1000) {
                                  totalVideos += liveStreams
                                }else {
                                  totalVideos += 7
                                }
                                //$("#videos-today-panel").text(addCommas(totalVideos))
                              }, 5000);
                        }
                      }
                    },
                    plotOptions : {
                      spline: {
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 3
                            }
                        },
                        marker: {
                            symbol: "circle"
                        },
                      }
                    },
                    title : {
                      text : ''
                    },
                    xAxis : {
                      type : 'datetime',
                      tickPixelInterval : 150
                    },
                    yAxis : [ {
                      title : {
                        text : ''
                      },
                      plotLines : [ {
                        value : 0,
                        width : 1
                      } ],
                      plotLines : [ {
                        value : 0,
                        width : 1
                      } ],
                      plotLines : [ {
                        value : 0,
                        width : 1
                      } ],
                      plotLines : [ {
                        value : 0,
                        width : 1
                      } ]
                    }],
                    tooltip : {
                      formatter : function() {
                        return '<b>'
                            + this.series.name
                            + '</b><br/>'
                            + Highcharts
                                .dateFormat(
                                    '%Y-%m-%d %H:%M:%S',
                                    this.x)
                            + '<br/>'
                            + Highcharts
                                .numberFormat(
                                    this.y,
                                    2);
                      }
                    },
                    legend : {
                      enabled : true,
                      padding : 14,
                      itemDistance: 25,
                      borderColor: '#cfd1db',
                      y: 10
                    },
                    exporting : {
                      enabled : false
                    },
                    series : [
                        {
                          name : 'iOS',
                          data : (function() {
                            // generate an array of data
                            var data = [], time = (new Date())
                                .getTime(), i;

                            for (i = -49; i <= 0; i+= 5) {
                              data
                                  .push({
                                    x : time
                                        + i
                                        * 1000,
                                    y : Math.floor((Math.random() * (450)+1) + 8800)
                                  });
                            }
                            return data;
                          })()
                        },
                        {
                          name : 'Android',
                          data : (function() {
                            // generate an array of data
                            var data = [], time = (new Date())
                                .getTime(), i;

                            for (i = -49; i <= 0; i+= 5) {
                              data
                                  .push({
                                    x : time
                                        + i
                                        * 1000,
                                    y : Math.floor((Math.random() * (300)+1) + 8000)
                                  });
                            }
                            return data;
                          })()
                        },
                        {
                          name : 'Roku',
                          data : (function() {
                            // generate an array of data
                            var data = [], time = (new Date())
                                .getTime(), i;

                            for (i = -49; i <= 0; i+= 5) {
                              data
                                  .push({
                                    x : time
                                        + i
                                        * 1000,
                                    y : Math.floor((Math.random() * (480)+1) + 5400)
                                  });
                            }
                            return data;
                          })()
                        },
                        {
                          name : 'Apple TV',
                          data : (function() {
                            // generate an array of data
                            var data = [], time = (new Date())
                                .getTime(), i;

                            for (i = -49; i <= 0; i+= 5) {
                              data
                                  .push({
                                    x : time
                                        + i
                                        * 1000,
                                    y : Math.floor((Math.random() * (250)+1) + 6000),
                                  });
                            }
                            return data;
                          })()
                        },
                        {
                          name : 'Web',
                          data : (function() {
                            // generate an array of data
                            var data = [], time = (new Date())
                                .getTime(), i;

                            for (i = -49; i <= 0; i+= 5) {
                              data
                                  .push({
                                    x : time
                                        + i
                                        * 1000,
                                    y : Math.floor((Math.random() * (380)+1) + 11000)
                                  });
                            }
                            return data;
                          })()
                        }
                      ]
                  });
        });

});