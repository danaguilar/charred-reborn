import skillsJSON from 'data/gold/skills.json'
import traitsJSON from 'data/gold/traits.json'

const traitsData = traitsJSON
const skillsData = skillsJSON

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

  CompareShade(otherShade) {
    if(this == otherShade) return this
    return this.Black
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

export class RelationshipType {
  static Minor = new RelationshipType('Minor', 5)
  static Important = new RelationshipType('Important', 10);
  static Powerful = new RelationshipType('Powerful', 15);

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
  constructor(name, shade, value, statType, active=true) {
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

  SetValue(val) {
    this.value = val
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

export class RelationshipModifier {
  static ImmediateFamily = new RelationshipModifier("Immediate family", -2)
  static OtherFamily =  new RelationshipModifier("Other family",  -1)
  static Romantic = new RelationshipModifier("Romantic",  -2)
  static Forbidden = new RelationshipModifier("Forbidden", -1)
  static Hateful = new RelationshipModifier("Hateful", -2)

  constructor(name, rp) {
    this.name = name;
    this.rp = rp
  }
}

export class Relationship {
  constructor() {
    this.name = ""
    this.type = RelationshipType.Minor
    this.rp = this.type.rp
    this.rel_modifiers = []
  }

  CalculateRP() {
    this.rp = Math.max(this.type.rp +
      this.rel_modifiers.reduce((total, rel_mod) => {
        return total + rel_mod.rp
      }, 0), 1)
  }

  ToggleModifier(rel_mod) {
    const foundIndex = this.rel_modifiers.indexOf(rel_mod)
    if(foundIndex != -1) this.rel_modifiers.splice(foundIndex, 1)
    else this.rel_modifiers.push(rel_mod)
    this.CalculateRP()
  }

  SetRelationshipType(relType) {
    this.type = relType
    this.CalculateRP()
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

const defaultTraitData = {
  type: "character", 
  desc: "",
  cost: 1,
}

export class Trait {
  constructor(traitName, isRequired) {
    const traitData = traitsData[traitName] ? traitsData[traitName] : defaultTraitData
    this.name = traitName,
    this.type = traitData.type,
    this.desc = traitData.desc,
    this.required = isRequired,
    this.bonus = traitData.bonus,
    this.cost = traitData.cost,
    this.restrict = traitData.restrict,
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


export class SkillList {
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

class ResourceListItem {
  constructor(resourceData) {
    this.name = resourceData.name
    this.rp = resourceData.rp
    this.type = resourceData.type
  }

}

export class ResourceList {
  constructor(jsonData) {
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
