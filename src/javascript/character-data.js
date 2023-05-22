import { reactive } from 'vue'
import { Lifepath, DwarfLPList } from 'js/lifepath'
import { Shade, Attribute, StatType, Skill, Trait, Reputation, Affiliation, Relationship } from 'js/core'
import { HealthQuestionnaire, SteelQuestionnaire } from 'js/questionnaire'
import dwarfStartingStatsJSON from 'data/gold/starting_stat_pts/dwarf.json'

export const dwarfStartingStats = dwarfStartingStatsJSON
export const AvailableLifepathList = DwarfLPList

class Character {
  constructor() {
    this.Lifepaths = [],
    this.AvailableLPSkills = [],
    this.AvailableLPTraits = [],
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
    this.DerivedAttributes = {
      HealthAttr: new Attribute("Health", Shade.Black, 3, StatType.Derived),
      ReflexesAttr: new Attribute("Reflexes", Shade.Black, 0, StatType.Derived),
      SteelAttr: new Attribute("Steel", Shade.Black, 0, StatType.Derived),
      ResouceAttr: new Attribute("Resource", Shade.Black, 0, StatType.Derived),
      CircleAttr: new Attribute("Circles", Shade.Black, 0, StatType.Derived),
    }
    this.emotionAttribues = {
      GreedAttr: new Attribute("Greed", Shade.Black, 0, StatType.Derived, false),
      GriefAttr: new Attribute("Grief", Shade.Black, 0, StatType.Derived, false),
      HatredAttr: new Attribute("Hatred", Shade.Black, 0, StatType.Derived, false),
      VoidEmbraceAttr: new Attribute("Void Embrace", Shade.Black, 0, StatType.Derived, false),
      FaithAttr: new Attribute("Faith", Shade.Black, 0, StatType.Derived, false),
    }

    this.SpentPhysical = 0
    this.SpentMental = 0
    this.availableSettings = []
    this.GeneralSkills = []
    this.GeneralTraits = []
    this.AvailableLifepathList = DwarfLPList
    this.gear = []
    this.property = []
    this.affiliations = []
    this.reputations = []
    this.relationships = []
    this.new_reputation = new Reputation()
    this.new_affiliation = new Affiliation()
    this.new_relationship = new Relationship()
    this.health_questionnaire = HealthQuestionnaire
    this.steel_questionnaire = SteelQuestionnaire
    this.SetupQuestionnaireFunctions();
    this.steelShadeShifted = false
    this.CalculateLPChanges()
  }

  AddOrSubIfWillHigh() {
    console.log("Getting here")
    if(this.MentalAttributes.WillAttr.value > 4) return 1
    else if(this.MentalAttributes.WillAttr.value < 4) return -1
    return 0
  }

  SetupQuestionnaireFunctions() {
    this.steel_questionnaire.AddFunction("AddOrSubIfWillHigh", this.AddOrSubIfWillHigh.bind(this))
  }

  GetEmotionAttribute() {
    for(let emotion in this.emotionAttribues) {
      if(emotion.active) return emotion
    }
    return null
  }

  GetHealthValue() {
    let baseValue = 0
    if(this.MentalAttributes.WillAttr.shade != this.PhysicalAttributes.ForteAttr.shade) {
      baseValue = Math.floor((this.MentalAttributes.WillAttr.ValueForAverage(Shade.Black) + this.PhysicalAttributes.ForteAttr.ValueForAverage(Shade.Blacke))/2)
    }
    else {
      baseValue = Math.floor((this.MentalAttributes.WillAttr.value + this.PhysicalAttributes.ForteAttr.value)/2)
    }

    baseValue += this.health_questionnaire.SumQuestions()
    return baseValue
  }

  GetHealthShade() {
    return this.MentalAttributes.WillAttr.shade.CompareShade(this.PhysicalAttributes.ForteAttr.shade).toString()
  }

  GetSteelValue() {
    let baseValue = 3
    baseValue += this.steel_questionnaire.SumQuestions()
    return baseValue
  }

  GetSteelShade() {
    return this.steelShadeShifted ? Shade.Gray : Shade.Black
  }

  AddNewRelationshipToRelationships() {
    this.relationships.push(this.new_relationship)
    this.new_relationship = new Relationship()
  }

  AddNewReputationToRepList() {
    this.reputations.push(this.new_reputation)
    this.new_reputation = new Reputation()
  }

  AddNewAffiliationToAffList() {
    this.affiliations.push(this.new_affiliation)
    this.new_affiliation = new Affiliation()
  }

  UpdateNewReputationType(repType) {
    this.new_reputation.SetReputationType(repType)
  }

  UpdateNewAffiliationType(affType) {
    this.new_affiliation.SetAffiliationType(affType)
  }

  UpdateNewRelationshipType(relType) {
    this.new_relationship.SetRelationshipType(relType)
  }

  ToggleNewRelationshipMod(modifier) {
    this.new_relationship.ToggleModifier(modifier)
  }

  AvailableResourcePoints() {
    return this.GetResourcePoints() - this.SpentResourcePoints()
  }

  SpentResourcePoints() {
    return this.SumOfResourcePoints(this.gear) +
      this.SumOfResourcePoints(this.property) +
      this.SumOfResourcePoints(this.reputations) +
      this.SumOfResourcePoints(this.affiliations) +
      this.SumOfResourcePoints(this.relationships)
  }

  SumOfResourcePoints(resourceList) {
    if(resourceList.length <= 0) return 0
    return resourceList.reduce((total, resource) => {
      return total + resource.rp
    },0)
  }

  AddResource(gear) {
    if(gear.type == "property") {
      this.property.push(gear)
    }
    else {
      this.gear.push(gear)
    }
  }
  RemoveResource(resource) {
    if(resource.type == "property") {
      const foundIndex = this.property.indexOf(resource)
      if(foundIndex != -1) this.property.splice(foundIndex, 1)
    }
    else {
      const foundIndex = this.gear.indexOf(resource)
      if(foundIndex != -1) this.gear.splice(foundIndex, 1)
    }
  }
  RemoveRep(rep) {
    const foundIndex = this.reputations.indexOf(rep)
    if(foundIndex != -1) this.reputations.splice(foundIndex, 1)
  }
  RemoveAff(aff) {
    const foundIndex = this.affiliations.indexOf(aff)
    if(foundIndex != -1) this.affiliations.splice(foundIndex, 1)
  }
  RemoveRelationship(rel) {
    const foundIndex = this.relationships.indexOf(rel)
    if(foundIndex != -1) this.relationships.splice(foundIndex, 1)
  }
  AddGeneralSkill(skill) {
    if(this.HasGeneralSkillPointsLeft()) {
      const newSkill = new Skill(skill.name, false)
      newSkill.IncrementGeneralPoints()
      this.GeneralSkills.push(newSkill)
    }
  }
  HasTraitPointsLeft() {
    return this.GetTraitPointsLeft > 0
  }
  TraitFunctions() {
    return [
      this.AddGeneralTrait.bind(this),
      this.ToggleTraitBuying.bind(this),
      this.HasTraitPointsLeft.bind(this)
    ]
  }

  AddGeneralTrait(trait) {
    if(this.GetTraitPointsLeft() >= trait.cost) {
      const newTrait = new Trait(trait.name, false)
      newTrait.bought = true
      this.GeneralTraits.push(newTrait)
    }
  }

  ToggleTraitBuying(trait) {
    // Remove trait from general traits if it is currently in general traits
    const foundIndex  = this.GeneralTraits.indexOf(trait)
    if(foundIndex != -1) { 
      console.log(`${trait.name} to be removed at ${foundIndex}`)
      this.GeneralTraits.splice(foundIndex, 1)
    }
    else {
      trait.bought = !trait.bought
    }
  }

  TotalTraitList() {
    return this.AvailableLPTraits.concat(this.GeneralTraits)
  }

  GetTraitPointsLeft() {
    return this.GetTotalTraitPoints() - this.SpentTraitPoints()
  }

  IncrementGeneralSkill(skill) {
    if(this.HasGeneralSkillPointsLeft()) {
      skill.IncrementGeneralPoints()
    }
  }

  DecrementGeneralSkill(skill) {
    skill.DecrementGeneralPoints()
    if(skill.generalPointsSpent == 0) {
      const index = this.GeneralSkills.indexOf(skill);
      if (index !== -1) {
        this.GeneralSkills.splice(index, 1);
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
    this.CalculateAttributeChanges()
    this.CalculateSkillListChanges()
    this.CalculateTraitListChanges()
    this.CreateNewSkillList()
    this.CreateNewTraitList()
    this.UpdateLPSkillPts()
    this.UpdateGeneralSkillPts()
    this.UpdateAvailableSettings()
    this.CalculateAvailableLifepaths()
  }

  CalculateAttributeChanges() {
    this.CalculateResourceChanges()
  }

  CalculateResourceChanges() {
    const rp_total = this.property.reduce((total, property) => {
      return total + property.rp
    }, 0) + this.reputations.reduce((total, rep) => { 
      return total + rep.rp
    }, 0) + this.affiliations.reduce((total, aff) => {
      return total + aff.rp
    }, 0) + 3
    const new_val = Math.floor(rp_total/15)
    this.DerivedAttributes.ResouceAttr.SetValue(new_val)
  }

  CalculateCirclesChanges() {
    
  }

  UpdateLPSkillPts() {
    while(this.GetTotalLPSkillPoints() - this.SpentSkillPoints() < 0) {
      let skillsWithPoints = this.AvailableLPSkills.filter(skill => {
        if(skill.required) return skill.pointsSpent > 1
        return skill.pointsSpent > 0
      }).reverse()
      skillsWithPoints[0].DecrementPoints()
    }
  }

  UpdateGeneralSkillPts() {
    while(this.GetTotalGeneralSkillPoints() - this.SpentGeneralSkillPoints() < 0) {
      console.log("SHOULDN'T BE DOING THIS!!")
      let skillsWithGeneralPoints = this.AvailableLPSkills.filter(skill => {
        return skill.generalPointsSpent > 0
      })
      if(skillsWithGeneralPoints.length > 0) {
        skillsWithGeneralPoints[0].DecrementGeneralPoints()
      }
      else {
        this.DecrementGeneralSkill(this.GeneralSkills[0])
      }
    }
  }

  UpdateAvailableSettings() {
    if(this.Lifepaths.length == 0) {
      this.availableSettings = []
      return
    }
    let currentLifepath = this.Lifepaths[this.Lifepaths.length - 1]
    const settings = [currentLifepath.setting]
    this.availableSettings = settings.concat(currentLifepath.key_leads)
  }

  CalculateSkillListChanges() {
    // For every lifepath past the first
    for(let i = 1; i < this.Lifepaths.length; i++) {
      let LpUnderTest = this.Lifepaths[i]
      // Check all previous lifepaths
      for(let j = 0;  j < i ; j++) {
        let previousLP = this.Lifepaths[j]
        // It the previous lifepath does not have skills, move onto next
        if(!previousLP.skills) continue

        // For all skills in the current lifepath...
        for(let k = 0;  k < LpUnderTest.skills.length; k++) {
          let skillUnderTest = LpUnderTest.skills[k]
          // And all skills in the previous lifepath...
          for(let l = 0;  l < previousLP.skills.length; l++) {
            let previousSkill = previousLP.skills[l]

            // If there is a matching skill between the two
            if(skillUnderTest.name == previousSkill.name) {
              // And the current skill is required
              if(skillUnderTest.IsRequired()) {
                // And the previous skill is also required
                if(previousSkill.IsRequired()) {
                  // Make the current skill unrequired
                  skillUnderTest.SetRequired(false)
                  // If there is a next skill in the current lifepath, make that one required
                  if((k+1) < LpUnderTest.skills.length) LpUnderTest.skills[k+1].SetRequired(true)
                }
              }
            }
          }
        }
      }
    }
  }

  CreateNewTraitList() {
    let newTraitArray = []
    for(const LPIndex in this.Lifepaths) {
      if(this.Lifepaths[LPIndex].traits) {
        newTraitArray.push(this.Lifepaths[LPIndex].traits)
      }
    }
    newTraitArray = newTraitArray.flat()
    for(let traitIndex in newTraitArray) {
      const newTrait = newTraitArray[traitIndex]
      const foundTraitIndex = this.AvailableLPTraits.findIndex(trait => trait.name == newTrait.name)
      if(foundTraitIndex == -1) {
        this.AvailableLPTraits.push(newTrait)
        newTrait.active = true
      }
      else {
        const oldTrait = this.AvailableLPTraits[foundTraitIndex]
        if(oldTrait.required == true && newTrait.required == false) continue
        this.AvailableLPTraits[foundTraitIndex] = newTrait
        this.AvailableLPTraits[foundTraitIndex].active = true
      }
    }

    let filteredTraitArray = []
    // For each skill in the AvailableSkills
    for(let traitIndex in this.AvailableLPTraits) {
      let checkedTrait = this.AvailableLPTraits[traitIndex]
      // If the available skill exists in the new skill array... 
      if(newTraitArray.findIndex(trait => trait.name == checkedTrait.name) != -1) {
        filteredTraitArray.push(checkedTrait)
      }
    }
    this.AvailableLPTraits = filteredTraitArray
  }


  CreateNewSkillList() {
    // Create new array to store all lifepaths skills in
    let newSkillArray = []
    // For all lifepathfs
    for(const LPIndex in this.Lifepaths) {
      if(this.Lifepaths[LPIndex].skills) {
        // Add the skills of that lifepath to the skill array if skills exist
        newSkillArray.push(this.Lifepaths[LPIndex].skills)
      }
    }
    // For each skill in the newSkillArray
    newSkillArray = newSkillArray.flat()
    for(let skillIndex in newSkillArray) {
      const newSkill = newSkillArray[skillIndex]
      // Find if the skill currently exists in the AvailableLPSkills list
      const foundSkillIndex = this.AvailableLPSkills.findIndex(skill => skill.name == newSkill.name)
      // If it does not exist....
      if(foundSkillIndex == -1) {
        // Add the found skill to the Available list and set active
        this.AvailableLPSkills.push(newSkill)
        newSkill.active = true
      }
      // If it does exist... 
      else {
        this.AvailableLPSkills[foundSkillIndex] = newSkill
        this.AvailableLPSkills[foundSkillIndex].active = true
      }
    }

    // Create filtered skill list
    let filteredSkillList = []
    // For each skill in the AvailableSkills
    for(let skillIndex in this.AvailableLPSkills) {
      let checkedSkill = this.AvailableLPSkills[skillIndex]
      // If the available skill exists in the new skill array... 
      if(newSkillArray.findIndex(skill => skill.name == checkedSkill.name) != -1) {
        // Add to filtered skill list
        filteredSkillList.push(checkedSkill)
      }
    }

    // Set AvailableSkills equal to filtered skills, ensuring that only skills in the current lifepath list remain
    this.AvailableLPSkills = filteredSkillList
  }

  CalculateTraitListChanges() {
    for(let i = 1; i < this.Lifepaths.length; i++) {
      // For each lifepath after the first...
      let LpUnderTest = this.Lifepaths[i]
      for(let j = 0;  j < i ; j++) {
        // Fot each lifepath before the selected lifepath
        let previousLP = this.Lifepaths[j]

        for(let k = 0;  k < LpUnderTest.traits.length; k++) {
          // For each trait in the first lifepath
          let traitUnderTest = LpUnderTest.traits[k]
          // Set the cost of that trait to 1
          traitUnderTest.cost = 1
          for(let l = 0;  l < previousLP.traits.length; l++) {
            // For each trait in the second (previous) lifepath
            let previousTrait = previousLP.traits[l]

            // If the traits are the same (by having the same name)
            if(traitUnderTest.name == previousTrait.name) {
              // If the the trait from the first lifepath is required
              if(traitUnderTest.required) {
                // And the trait from the previous lifepath was required
                if(previousTrait.required) {
                  // Make the first trait non-required
                  traitUnderTest.required.SetRequired(false)
                  // If there is a "next trait" in the lifepath, make it required
                  if((k+1) < LpUnderTest.traits.length) LpUnderTest.traits[k+1].SetRequired(true)
                }
              }
            }
          }
        }
      }
    }
  }
  
  SpentTraitPoints() {
    const result = this.TotalTraitList().filter(trait => trait.active).reduce((total,trait) => {
      if(trait.bought) {
        return total + trait.cost
      }
      else {
        return total
      }
    }, 0)
    return result ? result : 0
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
    if(!currentMentalPool) currentMentalPool = this.GetMentalPool()
    this.SpentMental = currentMentalPool
    for(let attrIndex in this.MentalAttributes) {
      this.MentalAttributes[attrIndex].ResetValues()
    }
    const mentalAttrArr = [
      this.MentalAttributes.WillAttr,
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
    if(!currentPhysicalPool) currentPhysicalPool = this.GetPhysicalPool()
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