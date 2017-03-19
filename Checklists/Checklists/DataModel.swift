//
//  DataModal.swift
//  Checklists
//
//  Created by  jasonliao on 26/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import Foundation
import os.log

class DataModel {
    // MARK: Archiving Paths
    
    static let documentDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let archiveURL = documentDirectory.appendingPathComponent("checklists.plist")

    var checklists = [Checklist]()
    var indexOfSelectedChecklist: Int {
        set {
            UserDefaults.standard.set(newValue, forKey: "checklistIndex")
        }
        get {
            return UserDefaults.standard.integer(forKey: "checklistIndex")
        }
    }
    
    init() {
        print(DataModel.archiveURL.path)
        loadChecklists()
        registerDefaults()
    }
    
    func saveChecklists() {
        let isSuccessfulSave = NSKeyedArchiver.archiveRootObject(checklists, toFile: DataModel.archiveURL.path)
        
        if isSuccessfulSave {
            os_log("save successfully", log: OSLog.default, type: .default)
        } else {
            os_log("save failed", log: OSLog.default, type: .error)
        }
    }
    
    func loadChecklists() {
        if let lists = NSKeyedUnarchiver.unarchiveObject(withFile: DataModel.archiveURL.path) as? [Checklist] {
            checklists = lists
            sortChecklists()
        }
    }
    
    func registerDefaults() {
        let dictionary: [String: Any] = ["checklistIndex": -1, "checklistItemID": 0]
        UserDefaults.standard.register(defaults: dictionary)
    }
    
    func sortChecklists() {
        checklists.sort(by: { checklist1, checklist2 in
            return checklist1.name.localizedCompare(checklist2.name) == .orderedAscending
        })
    }
    
    class func nextChecklistItemID() -> Int {
        let userDefault = UserDefaults.standard
        let itemID = userDefault.integer(forKey: "checklistItemID")
        
        userDefault.set(itemID + 1, forKey: "checklistItemID")
        userDefault.synchronize()
        
        return itemID
    }

}
