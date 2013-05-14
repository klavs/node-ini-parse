var fs = require('fs');

var regex = {
    section: /^\s*\[\s*([^\] ]*)\s*\]\s*$/,
    param: /^\s*([\w\.\-\_ ]+)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
    contline: /\s*\\$/
};

function parse(data){
    var value = {};

    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    var line = '';
    lines.forEach(function(oneLine){
        if(oneLine !== ''){
            oneLine = oneLine.replace(/^\s+|\s+$/g, '');
            if (regex.contline.test(oneLine)) {
                line += oneLine.replace(regex.contline, ' ');
                return;
            } else {
                line += oneLine;
            }
            if(regex.comment.test(line)){
                line = '';
                return;
            }else if(regex.param.test(line)){
                var match = line.match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(line)){
                var match = line.match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length == 0 && section){
                section = null;
            };
        }
        line = '';
    });
    return value;
}

module.exports.parse = function(file, callback){
    if(!callback){
        return;
    }
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, parse(data));
        }
    });
}

module.exports.parseSync = function(file){
    return parse(fs.readFileSync(file, 'utf8'));
};

module.exports.parseString = parse;
