

(function () {

    /**
     * Remove acentos de caracteres
     * @param  {String} stringComAcento [string que contem os acentos]
     * @return {String}                 [string sem acentos]
     */
    function removerAcentos(newStringComAcento) {
        var string = newStringComAcento;
        var mapaAcentosHex = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g
        };

        for (var letra in mapaAcentosHex) {
            var expressaoRegular = mapaAcentosHex[letra];
            string = string.replace(expressaoRegular, letra);
        }

        return string;
    }

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        // win.focus();
    }

    setInterval((document) => {
        try {
            var elem = document.querySelectorAll('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList');
            // var elem = document.querySelectorAll('div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList');
            console.log(elem);
            // elem[0].style.display = "none";   
        } catch (error) {
            
        }
    }, 1000)



    $.get('https://uinames.com/api/', {
        region: 'brazil'
    }, (response) => {

        let client_id = `${response.name} ${response.surname} ${new Date().getTime()}`;
        client_id = client_id.replace(/ /g, '-').toLowerCase();
        client_id = removerAcentos(client_id);

        // $.get(`https://ec2-13-59-175-92.us-east-2.compute.amazonaws.com:8443/add/${client_id}`);

        // openInNewTab(`http://ec2-13-59-175-92.us-east-2.compute.amazonaws.com/add/${client_id}`);
        // window.open(`http://ec2-13-59-175-92.us-east-2.compute.amazonaws.com/add/${client_id}`);
        // window.open(`https://ec2-13-59-175-92.us-east-2.compute.amazonaws.com/add/${client_id}`);

        // $.get(`http://ec2-13-59-175-92.us-east-2.compute.amazonaws.com/add/${client_id}`);
        // $.get(`https://ec2-13-59-175-92.us-east-2.compute.amazonaws.com/add/${client_id}`);

        $('#google-form')
            .attr(
                'src',
                `https://docs.google.com/forms/d/e/1FAIpQLSfh9lfSIJEJ-35aFELWsKVdfKnqz7MJmS4-ZDwNHXqcaEFdYA/viewform?usp=pp_url&entry.592350318=${client_id}`
            )

            

        var trck = document.createElement('script');
        trck.async = true;
        trck.type = 'text/javascript';
        trck.src = 'https://footstep.io/evc/static/js/trck.min.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(trck, node);
        trck.onload = function () {
            _trck.init({
                client_id: client_id,
                cookie_cfg: {
                    name: '_trck', //optional; default: _trck
                    domain: 'https://guilheeeeeeerme.github.io/footstep/'
                }
            });
        }

    });

})();