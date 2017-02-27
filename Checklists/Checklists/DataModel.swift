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
        }
    }
    
    func registerDefaults() {
        let dictionary: [String: Any] = ["checklistIndex": -1]
        UserDefaults.standard.register(defaults: dictionary)
    }

}
