'use strict';

const GedcomManager = require(__dirname + '/standards/gedcom.js')
const AbovilleManager = require(__dirname + '/standards/aboville.js');
const SosaStradonitzManager = require(__dirname + '/standards/sosaStradonitz.js');

module.exports = class StandardsManager{
    constructor(sequelize) {
        this.gedcom = new GedcomManager(sequelize);
        this.aboville = new AbovilleManager(sequelize);
        this.sosaStradonitz = new SosaStradonitzManager(sequelize);
    }
};