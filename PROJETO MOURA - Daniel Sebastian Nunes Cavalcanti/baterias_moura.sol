// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BateriasDefeitos {
    struct Bateria {
        string tipo;
        string uso;
        uint256 nr_serie;
        string dataprod;
        string lote;
    }

    Bateria[] private baterias;

    function setter(string memory _tipo, string memory _uso, uint256 _nr_serie, string memory _dataprod, string memory _lote) public { 
        baterias.push(Bateria({
            tipo: _tipo, 
            uso: _uso, 
            nr_serie: _nr_serie, 
            dataprod: _dataprod, 
            lote: _lote
            }));
    }

    function getter(uint256 _id) public view returns (Bateria memory) {
        return baterias[_id];
    }

    function list() public view returns (Bateria[] memory){
        return baterias;
    }

}
