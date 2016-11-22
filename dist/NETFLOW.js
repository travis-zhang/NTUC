/**
 * @author Travis-Zhang / https://github.com/Travis-Zhang on 2016/11/22.
 */
var NTUC = {
    unit:new Object(),
    bb:8,
    dp:3,
    unit:1024,
    level:2,//default 2 MB or Mb
    unitstr:['Byte','KB','MB','GB','TB','PB','EB','ZB','YB','BB','NB','DB'],
    uniflowLevel:function(defv){
        var level = 2;
        switch(defv){
            case 'Byte':
                level = 0;
                break;
            case 'KB':
                level = 1;
                break;
            case 'MB':
                level = 2;
                break;
            case 'GB':
                level = 3;
                break;
            case 'TB':
                level = 4;
                break;
            case 'PB':
                level = 5;
                break;
            case 'EB':
                level = 6;
                break;
            case 'ZB':
                level = 7;
                break;
            case 'YB':
                level = 8;
                break;
            case 'BB':
                level = 9;
                break;
            case 'NB':
                level = 10;
                break;
            case 'DB':
                level = 11;
                break;
            default:
                level = 2;
        }
        this.level = level;
    },
    uniFlow:function(defv,flow,isBytes){
        var FF = new Object(),fl = new Decimal(flow);
        this.uniflowLevel(defv);
        FF.unit = this.unitstr[this.level];
        FF.flow = fl.div(new Decimal(this.unit).pow(this.level)).toNumber();
        FF = this.unitCalc(this.precisionCalc(FF),isBytes);
        return FF;
    },
    dynamicFlow: function (flow, isBytes) {
        var DB, NB, BB, YB, ZB, EB, PB, TB, GB, MB, KB,
            Byte = new Decimal(flow), FF = new Object(), unit = this.unit;
        FF.unit = "MB";
        FF.flow = new Decimal(0);
        if (Byte.isNaN()) {

        } else {
            if (Byte.gt(unit)) {
                KB = Byte.div(unit);
                if (KB.gt(unit)) {
                    MB = KB.div(unit);
                    if (MB.gt(unit)) {
                        GB = MB.div(unit);
                        if (GB.gt(unit)) {
                            TB = GB.div(unit);
                            if (TB.gt(unit)) {
                                PB = TB.div(unit);
                                if (PB.gt(unit)) {
                                    EB = PB.div(unit);
                                    if (EB.gt(unit)) {
                                        ZB = EB.div(unit);
                                        if (ZB.gt(unit)) {
                                            YB = ZB.div(unit);
                                            if (YB.gt(unit)) {
                                                BB = YB.div(unit);
                                                if (BB.gt(unit)) {
                                                    NB = BB.div(unit);
                                                    if (NB.gt(unit)) {
                                                        DB = NB.div(unit);
                                                        FF.flow = DB;
                                                        FF.unit = "DB";
                                                    } else {
                                                        FF.flow = NB;
                                                        FF.unit = "NB";
                                                    }
                                                } else {
                                                    FF.flow = BB;
                                                    FF.unit = "BB";
                                                }
                                            } else {
                                                FF.flow = YB;
                                                FF.unit = "YB";
                                            }
                                        } else {
                                            FF.flow = ZB;
                                            FF.unit = "ZB";
                                        }
                                    } else {
                                        FF.flow = EB;
                                        FF.unit = "EB";
                                    }
                                } else {
                                    FF.flow = PB;
                                    FF.unit = "PB";
                                }
                            } else {
                                FF.flow = TB;
                                FF.unit = "TB";
                            }
                        } else {
                            FF.flow = GB;
                            FF.unit = "GB";
                        }
                    } else {
                        FF.flow = MB;
                        FF.unit = "MB";
                    }
                } else {
                    FF.flow = KB;
                    FF.unit = "KB";
                }
            } else if (Byte.eq(0)) {

            } else {
                FF.flow = Byte;
                FF.unit = "Byte";
            }
        }
        FF = this.unitCalc(this.precisionCalc(FF),isBytes);
        return FF;
    },
    unitCalc:function(FF,isBytes){
        if (!isBytes) {
            FF.flow = new Decimal(FF.flow).mul(this.bb).toNumber();
            FF.unit = FF.unit.replace("B", "b");
            if(FF.unit == "bB"){
                FF.unit = "Bb";
            }
        }
        return FF;
    },
    precisionCalc:function (FF) {
        var t = FF.flow.toString();
        var ti = t.indexOf(".");
        var ta = ti + this.dp;
        if (ti != -1) {
            var MAX = Decimal.clone({precision: (ta)});
            if (ta <= t.length) {
                FF.flow = new MAX(t.substring(0, ta)).toNumber();
            } else {
                var tr = t.substring(0, t.length);
                var l = ta - t.length;
                for (var s = 0; s = l; s++) {
                    tr += "0"
                }
                FF.flow = new MAX(tr).toNumber();
            }
        } else {
            FF.flow = new Decimal(t).toNumber();
        }
        return FF;
    }

};