//Mateus Omar
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeituosasMoura {

    
    struct Bateria {
        string tipo;
        string uso;
        string numeroSerie;
        string dataProd;
        string lote;
    }

    
    Bateria[] private baterias;

    
    function adicionarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _numeroSerie,
        string memory _dataProd,
        string memory _lote
    ) public {
        Bateria memory novaBateria = Bateria({
            tipo: _tipo,
            uso: _uso,
            numeroSerie: _numeroSerie,
            dataProd: _dataProd,
            lote: _lote
        });
        baterias.push(novaBateria);
    }

    
    function getBateria(uint _index) public view returns (
        string memory tipo,
        string memory uso,
        string memory numeroSerie,
        string memory dataProd,
        string memory lote
    ) {
        require(_index < baterias.length, "Indice invalido");
        Bateria storage b = baterias[_index];
        return (b.tipo, b.uso, b.numeroSerie, b.dataProd, b.lote);
    }

    
    function listar() public view returns (Bateria[] memory) {
        return baterias;
    }

    
    function totalBaterias() public view returns (uint) {
        return baterias.length;
    }

}
