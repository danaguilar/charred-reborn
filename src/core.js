import skillsJSON from '../data/gold/skills.json'
import traitsJSON from '../data/gold/traits.json'
import dwarfResourceJSON from '../data/gold/resources/dwarf.json'

const traitsData = traitsJSON
const skillsData = skillsJSON
const resourceData = dwarfResourceJSON

export class Shade {
  static Black = new Shade('Black');
  static Gray = new Shade('Gray');
  static White = new Shade('White');

  constructor(name) {
    this.name = name;
  }

  toString() {
    if(this.name == "Black") return "B"
    if(this.name == "Gray") return "G"
    if(this.name == "White") return "W"
    return "ERROR"
  }

  ToNumber() {
    if(this.name == "Black") return 0
    if(this.name == "Gray") return 2
    if(this.name == "White") return 4
    return 0
  }
}

export class ReputationType {
  static Minor = new ReputationType('Local/Minor', 7)
  static Notable = new ReputationType('Regional/Notable', 25);
  static Major = new ReputationType('National/Major', 45);

  constructor(name, cost) {
    this.name = name;
    this.rp = cost;
  }
}

export class AffiliationType {
  static Small = new AffiliationType('Small', 10)
  static Large = new AffiliationType('Large', 25);
  static National = new AffiliationType('National', 50);

  constructor(name, cost) {
    this.name = name;
    this.rp = cost;
  }
}

export class StatType {
  static Physical = new StatType('Physical');
  static Mental = new StatType('Mental');
  static Derived = new StatType('Derived');

  constructor(name) {
    this.name = name;
  }
}

export class Attribute {
  constructor(name, shade, value, statType) {
    this.name = name
    this.shade = shade
    this.value = value,
    this.statType = statType
  }

  toString() {
    return `${this.shade}${this.value}`
  }

  ValueForAverage(shade) {
    const shadeDiff = this.shade.ToNumber() - shade.ToNumber()
    return this.value + shadeDiff
  }

  UpShade() {
    if(this.value > 5) {
      if(this.shade == Shade.Gray.name) this.shade = Shade.White
      if(this.shade == Shade.Black.name) this.shade = Shade.Gray
      value -= 5
    }
  }

  DownShade() {
    if(this.shade == Shade.Gray.name) this.shade = Shade.Black
    if(this.shade == Shade.White.name) this.shade = Shade.Gray
    value += 5
  }

  ShouldShowPlus() {
    // Should also check highest attribute allowed for race
    return this.statType != StatType.Derived
  }

  ShouldShowMinus() {
    return this.statType != StatType.Derived
  }

  Increment() {
    this.value++
  }

  Decrement() {
    if(this.value > 0) this.value--
  }

  ResetValues() {
    this.value = 0
    this.shade = Shade.Black
  }
}

export class Reputation {
  constructor() {
    this.name = ""
    this.type = ReputationType.Minor
    this.rp = this.type.rp
  }

  SetReputationType(type) {
    this.type = type
    this.rp = this.type.rp
  }
}

export class Affiliation {
  constructor() {
    this.name = ""
    this.type = AffiliationType.Small
    this.rp = this.type.rp
  }

  SetAffiliationType(type) {
    this.type = type
    this.rp = this.type.rp
  }
}


export class Skill {
  constructor(skillName, isRequired) {
    const skillRoots = skillsData[skillName] ? skillsData[skillName]["roots"] : ["Perception"]
    this.name = skillName
    this.roots = skillRoots
    this.totalPoints = 0
    this.pointsSpent = 0
    this.generalPointsSpent = 0
    this.shade = Shade.Black
    this.firstSkill = isRequired
    this.active = true
    this.SetRequired(isRequired)
  }

  DecrementPoints() {
    let minPoints = this.required ? 1 : 0
    if(this.pointsSpent - 1 >= minPoints) {
      this.pointsSpent--
      this.totalPoints--
    }
  }

  IncrementGeneralPoints() {
    this.generalPointsSpent++
    this.totalPoints++
  }
  
  DecrementGeneralPoints() {
    this.generalPointsSpent--
    this.totalPoints--
  }

  IncrementPoints() {
    this.pointsSpent++
    this.totalPoints++
  }

  IsRequired() {
    return this.required
  }

  SetRequired(isRequired) {
    if(this.required == true && isRequired == false && this.pointsSpent == 1) {
      this.pointsSpent = 0
      this.totalPoints = 0
    }
    this.required = isRequired
    if(isRequired && this.pointsSpent < 1) {
      this.IncrementPoints()
    }
  }

  CalculateStartingSkills(characterData) {
    const characterAttrArray = characterData.GetArrayOfAttributes()
    const attributeArr = this.roots.map( attrName => {
      for(let attrIndex in characterAttrArray){
        const characterAttr = characterAttrArray[attrIndex]
        if( attrName == characterAttr.name) return characterAttr
      }
    })

    let newShade = null
    for(let attrIndex in attributeArr) {
      if(!newShade) newShade = attributeArr[attrIndex].shade
      else {
        if(newShade != attributeArr[attrIndex].shade) {
          newShade = Shade.Black
          break
        }
      }
    }
    this.shade = newShade
    const average = Math.floor(attributeArr.reduce((runningTotal, attr) => {
      return runningTotal + attr.ValueForAverage(this.shade)
    }, 0) / attributeArr.length)
    return Math.max(Math.floor(average/2), 1)
  }
}

export class Trait {
  constructor(traitName, isRequired) {
    this.name = traitName,
    this.type = traitsData[traitName].type,
    this.desc =traitsData[traitName].desc,
    this.required = isRequired,
    this.bonus = traitsData[traitName].bonus,
    this.cost = traitsData[traitName].cost,
    this.restrict = traitsData[traitName].restrict,
    this.active = true
    this.bought = isRequired
  }

  IconString() {
    if(this.type == "character" ) return "person-fill"
    if(this.type == "call_on" ) return "chat-fill"
    if(this.type == "die" ) return "dice-6-fill"
  }

  SetRequired(require) {
    this.required = require
    this.bought = require
  }
}

class SkillListItem {
  constructor(name, jsonData) {
    this.name = name
    this.roots = jsonData.roots
    this.type = jsonData.type
    this.isMagic = !!jsonData.magic
    this.unlockonly = !!jsonData.unlockonly
  }
}


class SkillList {
  constructor(jsonData, stock) {
    for(let skillName in jsonData) {
      // Ignore wises
      if(skillName.indexOf("-wise") != -1) continue
      let skillData = jsonData[skillName]
      // Skip skills that cannot be learned by the given stock
      if(!skillData.stock || skillData.stock == stock) {
        if(!this[skillData.type]) {
          this[skillData.type] = []
        }
        this[skillData.type].push(new SkillListItem(skillName, skillData))
      }
    }
  }
}

class TraitListItem {
  static DescLengthBreakPoints = [ 450, 1000 ]
  constructor(traitName, traitData) {
    this.name = traitName,
    this.desc = traitData.desc
    this.cost = traitData.cost
    this.type = traitData.type
  }

  IconString() {
    if(this.type == "character" ) return "person-fill"
    if(this.type == "call_on" ) return "chat-fill"
    if(this.type == "die" ) return "dice-6-fill"
  }

  ColSize() {
    if(this.type == 'character') return 4
    if(this.type == 'call_on') return 6
    return 12
  }

}

export class TraitList {
  static formattedType(type) {
    switch(type) {
      case 'die': return 'Die'
      case 'call_on': return 'Call On'
      case 'character': return 'Character'
   }
  }

  constructor(jsonData, stock) {
    this['die'] = []
    this['call_on'] = []
    this['character'] = []
    for(let traitName in jsonData) {
      let traitData = jsonData[traitName]
      if((!traitData.restrict || traitData.restrict[0] == stock) && traitData.cost != 0) {
        if(!this[traitData.type]) {
          this[traitData.type] = []
        }
        this[traitData.type].push(new TraitListItem(traitName, traitData))
      }
    }
  }

}

export class ResourceListItem {
  constructor(resourceData) {
    this.name = resourceData.name
    this.rp = resourceData.rp
    this.type = resourceData.type
  }

}

export class ResourceList {
  constructor(jsonData, stock) {
    this['property'] = []
    this['gear'] = []
    for(let element in jsonData) {
      const resorceData = jsonData[element]
      this[resorceData.type].push(new ResourceListItem(resorceData))
    }
    this['gear'].sort((a, b) => { return a.rp > b.rp })
    this['property'].sort((a, b) => { return a.rp > b.rp })
  }
}

export const DwarfSkillList = new SkillList(skillsJSON, "dwarven")
export const DwarfTraitList = new TraitList(traitsJSON, "dwarven")
export const DwarfResourceList = new ResourceList(resourceData, "dwarven")