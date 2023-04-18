import { reactive } from 'vue'
import { Lifepath, DwarfLPList } from './lifepath'
import { Shade, Attribute, StatType, Skill } from './core'
import dwarfStartingStatsJSON from '../data/gold/starting_stat_pts/dwarf.json'

export const dwarfStartingStats = dwarfStartingStatsJSON
export const AvailableLifepathList = DwarfLPList

class Character {
  constructor() {
    this.Lifepaths = [],
    this.AvailableLPSkills = [],
    this.MentalAttributes = {
      WillAttr: new Attribute("Will", Shade.Black, 0, StatType.Mental),
      PerceptionAttr: new Attribute("Perception", Shade.Black, 0, StatType.Mental)
    }
    this.PhysicalAttributes = {
      AgilityAttr: new Attribute("Agility", Shade.Black, 0, StatType.Physical),
      PowerAttr: new Attribute("Power", Shade.Black, 0, StatType.Physical),
      ForteAttr: new Attribute("Forte", Shade.Black, 0, StatType.Physical),
      SpeedAttr: new Attribute("Speed", Shade.Black, 0, StatType.Physical)
    }
    this.DerivedAttributes=  {
      HealthAttr: new Attribute("Health", Shade.Black, 3, StatType.Derived),
      ReflexesAttr: new Attribute("Reflexes", Shade.Black, 0, StatType.Derived),
      SteelAttr: new Attribute("Steel", Shade.Black, 0, StatType.Derived),
      EmotionAttr: new Attribute("DEFAULT_EMOTION", Shade.Black, 0, StatType.Derived),
    }
    this.SpentPhysical = 0
    this.SpentMental = 0
    this.availableSettings = []
    this.GeneralSkills = []
    this.AvailableLifepathList = DwarfLPList
    this.CalculateAvailableLifepaths()
  }

  AddGeneralSkill(skill) {
    if(this.HasGeneralSkillPointsLeft()) {
      const newSkill = new Skill(skill.name, false)
      newSkill.IncrementGeneralPoints()
      this.GeneralSkills.push(newSkill)
    }
  }

  IncrementGeneralSkill(skill) {
    if(this.HasGeneralSkillPointsLeft()) {
      skill.IncrementGeneralPoints()
    }
  }

  DecrementGeneralSkill(skill) {
    if(this.SpentGeneralSkillPoints() <= this.GetTotalGeneralSkillPoints() ) {
      skill.DecrementGeneralPoints()
      if(skill.generalPointsSpent == 0) {
        const index = this.GeneralSkills.indexOf(skill);
        if (index !== -1) {
          this.GeneralSkills.splice(index, 1);
        }
      }
    }
  }

  HasGeneralSkillPointsLeft() {
    return this.GetTotalGeneralSkillPoints() - this.SpentGeneralSkillPoints() > 0 
  }

  CalculateAvailableLifepaths() {
    if(this.availableSettings.length == 0) return this.AvailableLifepathList.DisableWhen((lifepath) => {
      return !lifepath.isBornLP
    })
    this.AvailableLifepathList.ActivateSettings(this)
  }

  GetArrayOfAttributes() {
    let attrArray = []
    for(let index in this.MentalAttributes) { attrArray.push(this.MentalAttributes[index]) }
    for(let index in this.PhysicalAttributes) { attrArray.push(this.PhysicalAttributes[index]) }
    for(let index in this.DerivedAttributes) { attrArray.push(this.PhysicalAttributes[index]) }
    return attrArray
  }

  SpendFromPool(attribute) {
    if(attribute.statType.name == StatType.Mental.name) this.SpendMental(attribute)
    if(attribute.statType.name == StatType.Physical.name) this.SpendPhysical(attribute)
  }

  SpendMental(attribute) {
    if(this.SpentMental + 1  > this.GetMentalPool()) return false
    this.SpentMental++
    attribute.Increment()
  }

  SpendPhysical(attribute) {
    if(this.SpentPhysical + 1  > this.GetPhysicalPool()) return false
    this.SpentPhysical++
    attribute.Increment()
  }

  ReturnToPool(attribute) {
    if(attribute.statType.name == StatType.Mental.name) this.ReturnMental(attribute)
    if(attribute.statType.name == StatType.Physical.name) this.ReturnPhysical(attribute)
  }

  ReturnMental(attribute) {
    if(this.SpentMental - 1  < 0) return false
    this.SpentMental--
    attribute.Decrement()
  }

  ReturnPhysical(attribute) {
    if(this.SpentPhysical - 1  < 0) return false
    this.SpentPhysical--
    attribute.Decrement()
  }

  AddLifepath(setting, title) {
    const newLifepath = new Lifepath(setting, title)
    this.Lifepaths.push(newLifepath)
    for(let lp in this.Lifepaths) {
      // lp.ResetSkillRequirements()
    }
    this.CalculateLPChanges()
  }

  RemoveLifepath(lifepath) {
    const indexToRemove = this.Lifepaths.indexOf(lifepath)
    if(indexToRemove > -1) {
      this.Lifepaths.splice(indexToRemove, Infinity);
    }
    this.CalculateLPChanges()
  }

  CalculateLPChanges() {
    for(let LPIndex in this.Lifepaths) {
      let LP  = this.Lifepaths[LPIndex]
      LP.ResetSkillRequirements()
    }
    this.CalculateSkillListChanges()
    this.CalculateTraitListChanges()
    this.CreateNewSkillList()
    this.UpdateAvailableSettings()
    this.CalculateAvailableLifepaths()
  }

  UpdateAvailableSettings() {
    if(this.Lifepaths.length == 0) return
    let currentLifepath = this.Lifepaths[this.Lifepaths.length - 1]
    const settings = [currentLifepath.setting]
    this.availableSettings = settings.concat(currentLifepath.key_leads)
  }

  CalculateSkillListChanges() {
    for(let i = 1; i < this.Lifepaths.length; i++) {
      let LpUnderTest = this.Lifepaths[i]
      for(let j = 0;  j < i ; j++) {
        let previousLP = this.Lifepaths[j]
        if(!previousLP.skills) continue

        for(let k = 0;  k < LpUnderTest.skills.length; k++) {
          let skillUnderTest = LpUnderTest.skills[k]
          for(let l = 0;  l < previousLP.skills.length; l++) {
            let previousSkill = previousLP.skills[l]

            if(skillUnderTest.name == previousSkill.name) {
              if(skillUnderTest.IsRequired()) {
                if(previousSkill.IsRequired()) {
                  skillUnderTest.SetRequired(false)
                  if((k+1) < LpUnderTest.skills.length) LpUnderTest.skills[k+1].SetRequired(true)
                }
              }
            }
          }
        }
      }
    }
  }

  CreateNewSkillList() {
    let newSkillArray = []
    for(const LPIndex in this.Lifepaths) {
      if(this.Lifepaths[LPIndex].skills) {
        newSkillArray.push(this.Lifepaths[LPIndex].skills)
      }
    }
    newSkillArray = newSkillArray.flat()
    for(let skillIndex in newSkillArray) {
      const newSkill = newSkillArray[skillIndex]
      const foundSkillIndex = this.AvailableLPSkills.findIndex(skill => skill.name == newSkill.name)
      if(foundSkillIndex == -1) {
        this.AvailableLPSkills.push(newSkill)
        newSkill.active = true
      }
      else {
        const oldSkill = this.AvailableLPSkills[foundSkillIndex]
        if(oldSkill.required == true && newSkill.required == false) continue
        this.AvailableLPSkills[foundSkillIndex] = newSkill
        this.AvailableLPSkills[foundSkillIndex].pointsSpent = oldSkill.pointsSpent
        this.AvailableLPSkills[foundSkillIndex].final = oldSkill.final
        this.AvailableLPSkills[foundSkillIndex].active = true

      }
    }
    let filteredSkillList = []
    for(let skillIndex in this.AvailableLPSkills) {
      let checkedSkill = this.AvailableLPSkills[skillIndex]
      if(newSkillArray.findIndex(skill => skill.name == checkedSkill.name) != -1) {
        filteredSkillList.push(checkedSkill)
      }
    }
    this.AvailableLPSkills = filteredSkillList
  }

  CalculateTraitListChanges() {
    for(let i = 1; i < this.Lifepaths.length; i++) {
      let LpUnderTest = this.Lifepaths[i]
      for(let j = 0;  j < i ; j++) {
        let previousLP = this.Lifepaths[j]

        for(let k = 0;  k < LpUnderTest.traits.length; k++) {
          let traitUnderTest = LpUnderTest.traits[k]
          for(let l = 0;  l < previousLP.traits.length; l++) {
            let previousTrait = previousLP.traits[l]

            if(traitUnderTest.name == previousTrait.name) {
              if(traitUnderTest.required) {
                if(previousTrait.required) {
                  traitUnderTest.required = false
                  if((k+1) < LpUnderTest.traits.length) LpUnderTest.traits[k+1].required = true
                }
              }
            }
          }
        }
      }
    }
  }

  GetAge() {
    return this.Lifepaths.reduce(
      (runningAge, LP) => { return runningAge + LP.time }, 0
    )
  }

  StartingMentalPool() {
    const age = this.GetAge();
    if(age == 0) return "0"
    const indexOfStats = dwarfStartingStats.findIndex(
      (element) => { 
        return age >= element.range[0] && age <= element.range[1] 
      });
    return dwarfStartingStats[indexOfStats].m
  }

  StartingPhysicalPool() {
    const age = this.GetAge();
    if(age == 0) return "0"
    const indexOfStats = dwarfStartingStats.findIndex(
      (element) => { 
        return age >= element.range[0] && age <= element.range[1] 
      });
    return dwarfStartingStats[indexOfStats].p
  }

  GetMentalPool() {
    const mentalPool = this.StartingMentalPool() + this.Lifepaths.reduce((runningPool, LP) => {
      let LpStat = 0
      if(Array.isArray(LP.stat)) {
        LpStat =  LP.stat.reduce((pool, statArr) => {
          if(statArr[1] == "m") { return pool + statArr[0]; }
          else { return pool}
        },0)
      }
      return runningPool + LpStat
    }, 0);
    if(mentalPool < this.SpentMental) {
      this.RebalanceMentalAttributes(mentalPool)
    }
    return mentalPool
  }

  RebalanceMentalAttributes(currentMentalPool) {
    this.SpentMental = currentMentalPool
    for(let attrIndex in this.MentalAttributes) {
      this.MentalAttributes[attrIndex].ResetValues()
    }
    const mentalAttrArr = [
      this.MentalAttributes.WisdomAttr,
      this.MentalAttributes.PerceptionAttr
    ]
    for(let i = 0; i < currentMentalPool; i++) {
      mentalAttrArr[i%mentalAttrArr.length].value++
    }
  }

  GetPhysicalPool() {
    const physicalPool = this.StartingPhysicalPool() + this.Lifepaths.reduce((runningPool, LP) => {
      let LpStat = 0
      if(Array.isArray(LP.stat)) {
        LpStat = LP.stat.reduce((pool, statArr) => {
          if(statArr[1] == "p") { return pool + statArr[0]; }
          else { return pool}
        },0)
      }
      return runningPool + LpStat
    }, 0);
    if(physicalPool < this.SpentPhysical) {
      this.RebalancePhysicalAttributes(physicalPool)
    }
    return physicalPool
  }

  RebalancePhysicalAttributes(currentPhysicalPool) {
    this.SpentPhysical = currentPhysicalPool
    const PhysicalAttrArr = [
      this.PhysicalAttributes.AgilityAttr,
      this.PhysicalAttributes.SpeedAttr,
      this.PhysicalAttributes.PowerAttr,
      this.PhysicalAttributes.ForteAttr,
    ]
    for(let attrIndex in PhysicalAttrArr) {
      PhysicalAttrArr[attrIndex].ResetValues()
    }
    for(let i = 0; i < currentPhysicalPool; i++) {
      PhysicalAttrArr[i%PhysicalAttrArr.length].value++
    }
  }

  IncrementSkill(skill) {
    if(this.GetTotalLPSkillPoints() > this.SpentSkillPoints()) {
      skill.IncrementPoints()
    }
    else if(this.HasGeneralSkillPointsLeft()) {
      skill.IncrementGeneralPoints()
    }
  }

  DecrementSkill(skill) {
    if(skill.generalPointsSpent > 0) {
      skill.DecrementGeneralPoints()
    }
    else if(this.SpentSkillPoints() > 0) {
      skill.DecrementPoints()
    }
  }

  SpentGeneralSkillPoints() {
    return this.AvailableLPSkills
      .filter(skill => { return skill.active })
      .reduce((total, skill) => {
        return total + skill.generalPointsSpent
      }, 0) +
      this.GeneralSkills.reduce((total, skill) => {
        return total + skill.generalPointsSpent
      }, 0)

  }

  SpentSkillPoints() {
      return this.AvailableLPSkills
        .filter(skill => { return skill.active })
        .reduce((total, skill) => {
          return total + skill.pointsSpent
        }, 0)
  }
  GetTotalTraitPoints() {
    return this.Lifepaths.reduce(
      (runningTps, LP) => { return runningTps + LP.traitPts }, 0
    )
  }

  GetTotalLPSkillPoints() {
    return this.Lifepaths.reduce((runningTotal, LP) => {
      if(LP.skillPts) {
        return runningTotal + LP.skillPts
      }
      else {
        return runningTotal
      }
    },0)
  }

  GetTotalGeneralSkillPoints() {
    const genSkillPts = this.Lifepaths.reduce((runningTotal, LP) => {
      return runningTotal + LP.generalSkillPts
    },0)
    return genSkillPts
  }

  GetResourcePoints() {
    return this.Lifepaths.reduce(
      (runningRes, LP) => { return runningRes + LP.res }, 0
    )
  }
}


export const CharacterData = reactive(new Character())