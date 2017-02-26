//
//  Checklist.swift
//  Checklists
//
//  Created by  jasonliao on 22/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import UIKit

class Checklist: NSObject, NSCoding {
    var name: String
    var items: [ChecklistItem]
    
       init(name: String, items: [ChecklistItem]) {
        self.name = name
        self.items = items
        super.init()
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: "name")
        aCoder.encode(items, forKey: "items")
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        let name = aDecoder.decodeObject(forKey: "name") as! String
        let items = aDecoder.decodeObject(forKey: "items") as! [ChecklistItem]
        self.init(name: name, items: items)
    }

}
