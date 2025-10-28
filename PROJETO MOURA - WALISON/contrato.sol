// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract BateriaDefeitos {
    struct Bateria {
        string nSerie;
        string lote;
    }

    Bateria[] private baterias;

    function get(uint256 _id) public view returns(Bateria memory) {
        return baterias[_id];
    }

    function set(string memory _nSerie, string memory _lote) public{
        baterias.push(
            Bateria({
                nSerie: _nSerie,
                lote: _lote
            })
        );
    }

    function listar() public view returns(Bateria[]memory) {
        return baterias;
    }
}