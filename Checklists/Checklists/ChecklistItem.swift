//
//  ChecklistItem.swift
//  Checklists
//
//  Created by  jasonliao on 11/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import Foundation

class ChecklistItem: NSObject, NSCoding {
    var text: String
    var checked: Bool
    var dueDate: Date
    var shouldRemind: Bool
    var itemID: Int
    
    init(text: String, checked: Bool) {
        self.text = text
        self.checked = checked
        itemID = DataModel.nextChecklistItemID()
        dueDate = Date()
        shouldRemind = false
        super.init()
    }
    

    func toggleChecked() {
        checked = !checked
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(text, forKey: "text")
        aCoder.encode(checked, forKey: "checked")
        aCoder.encode(dueDate, forKey: "dueDate")
        aCoder.encode(shouldRemind, forKey: "shouldRemind")
        aCoder.encode(itemID, forKey: "itemID")
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        let text = aDecoder.decodeObject(forKey: "text") as! String
        let checked = aDecoder.decodeBool(forKey: "checked")
        
        self.init(text: text, checked: checked)
        
        dueDate = aDecoder.decodeObject(forKey: "dueDate") as! Date
        shouldRemind = aDecoder.decodeBool(forKey: "shouldRemind")
        itemID = aDecoder.decodeInteger(forKey: "itemID")
        
        
    }

    
}
