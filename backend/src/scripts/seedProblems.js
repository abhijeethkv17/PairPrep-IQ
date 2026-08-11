import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Problem from "../models/Problem.js";
import User from "../models/User.js";
import { PROBLEMS } from "../../../frontend/src/data/problems.js";

// The old PROBLEMS entries were written for the old "run the whole script
// once, no stdin" execution model — starter code had test calls hardcoded
// inside comments. The new CodeBox-based grading model runs the submitted
// code once PER test case, feeding that case's `input` in as stdin and
// comparing stdout against that case's `output`. So testCases / codeSnippets
// / referenceSolutions can't be copied over — they're redefined here.
//
// Output format is kept identical across all three languages per problem
// (compact JSON for arrays, lowercase true/false for booleans, plain numbers
// for integers), since all three languages grade against the same
// testCases.output string.
const STDIN_OVERRIDES = {
  "two-sum": {
    testCases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]" },
    ],
    codeSnippets: {
      JAVASCRIPT: `function twoSum(nums, target) {
  // Write your solution here

}

const lines = require('fs').readFileSync(0, 'utf8').split('\\n');
const nums = JSON.parse(lines[0]);
const target = Number(lines[1]);
console.log(JSON.stringify(twoSum(nums, target)));`,
      PYTHON: `def twoSum(nums, target):
    # Write your solution here
    pass

import sys, json
nums = json.loads(sys.stdin.readline())
target = int(sys.stdin.readline())
print(json.dumps(twoSum(nums, target), separators=(',', ':')))`,
      JAVA: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here

        return new int[0];
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] nums = parseIntArray(scanner.nextLine());
        int target = Integer.parseInt(scanner.nextLine().trim());
        System.out.println(formatIntArray(twoSum(nums, target)));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }

    private static String formatIntArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(arr[i]);
        }
        return sb.append("]").toString();
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen[complement] !== undefined) return [seen[complement], i];
    seen[nums[i]] = i;
  }
  return [];
}

const lines = require('fs').readFileSync(0, 'utf8').split('\\n');
const nums = JSON.parse(lines[0]);
const target = Number(lines[1]);
console.log(JSON.stringify(twoSum(nums, target)));`,
      PYTHON: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

import sys, json
nums = json.loads(sys.stdin.readline())
target = int(sys.stdin.readline())
print(json.dumps(twoSum(nums, target), separators=(',', ':')))`,
      JAVA: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] nums = parseIntArray(scanner.nextLine());
        int target = Integer.parseInt(scanner.nextLine().trim());
        System.out.println(formatIntArray(twoSum(nums, target)));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }

    private static String formatIntArray(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(arr[i]);
        }
        return sb.append("]").toString();
    }
}`,
    },
  },

  "reverse-string": {
    testCases: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    codeSnippets: {
      JAVASCRIPT: `function reverseString(s) {
  // Write your solution here

}

const s = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
reverseString(s);
console.log(JSON.stringify(s));`,
      PYTHON: `def reverseString(s):
    # Write your solution here
    pass

import sys, json
s = json.loads(sys.stdin.read().strip())
reverseString(s)
print(json.dumps(s, separators=(',', ':')))`,
      JAVA: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here

    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char[] s = parseCharArray(scanner.nextLine());
        reverseString(s);
        System.out.println(formatCharArray(s));
    }

    private static char[] parseCharArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        if (line.isEmpty()) return new char[0];
        String[] parts = line.split(",");
        char[] result = new char[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = parts[i].trim().charAt(1);
        return result;
    }

    private static String formatCharArray(char[] arr) {
        char q = '"';
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(q).append(arr[i]).append(q);
        }
        return sb.append("]").toString();
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
}

const s = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
reverseString(s);
console.log(JSON.stringify(s));`,
      PYTHON: `def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

import sys, json
s = json.loads(sys.stdin.read().strip())
reverseString(s)
print(json.dumps(s, separators=(',', ':')))`,
      JAVA: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char[] s = parseCharArray(scanner.nextLine());
        reverseString(s);
        System.out.println(formatCharArray(s));
    }

    private static char[] parseCharArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        if (line.isEmpty()) return new char[0];
        String[] parts = line.split(",");
        char[] result = new char[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = parts[i].trim().charAt(1);
        return result;
    }

    private static String formatCharArray(char[] arr) {
        char q = '"';
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(q).append(arr[i]).append(q);
        }
        return sb.append("]").toString();
    }
}`,
    },
  },

  "valid-palindrome": {
    testCases: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" },
      { input: " ", output: "true" },
    ],
    codeSnippets: {
      JAVASCRIPT: `function isPalindrome(s) {
  // Write your solution here

}

const line = require('fs').readFileSync(0, 'utf8').trim();
console.log(isPalindrome(line));`,
      PYTHON: `def isPalindrome(s):
    # Write your solution here
    pass

import sys
line = sys.stdin.read().strip()
print(str(isPalindrome(line)).lower())`,
      JAVA: `import java.util.*;

class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here

        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line = scanner.hasNextLine() ? scanner.nextLine().trim() : "";
        System.out.println(isPalindrome(line));
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}

const line = require('fs').readFileSync(0, 'utf8').trim();
console.log(isPalindrome(line));`,
      PYTHON: `def isPalindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]

import sys
line = sys.stdin.read().strip()
print(str(isPalindrome(line)).lower())`,
      JAVA: `import java.util.*;

class Solution {
    public static boolean isPalindrome(String s) {
        StringBuilder cleaned = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                cleaned.append(Character.toLowerCase(c));
            }
        }
        String forward = cleaned.toString();
        String backward = new StringBuilder(forward).reverse().toString();
        return forward.equals(backward);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line = scanner.hasNextLine() ? scanner.nextLine().trim() : "";
        System.out.println(isPalindrome(line));
    }
}`,
    },
  },

  "maximum-subarray": {
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" },
    ],
    codeSnippets: {
      JAVASCRIPT: `function maxSubArray(nums) {
  // Write your solution here

}

const nums = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
console.log(maxSubArray(nums));`,
      PYTHON: `def maxSubArray(nums):
    # Write your solution here
    pass

import sys, json
nums = json.loads(sys.stdin.read().strip())
print(maxSubArray(nums))`,
      JAVA: `import java.util.*;

class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here

        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] nums = parseIntArray(scanner.nextLine());
        System.out.println(maxSubArray(nums));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

const nums = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
console.log(maxSubArray(nums));`,
      PYTHON: `def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

import sys, json
nums = json.loads(sys.stdin.read().strip())
print(maxSubArray(nums))`,
      JAVA: `import java.util.*;

class Solution {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] nums = parseIntArray(scanner.nextLine());
        System.out.println(maxSubArray(nums));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }
}`,
    },
  },

  "container-with-most-water": {
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "[1,1]", output: "1" },
    ],
    codeSnippets: {
      JAVASCRIPT: `function maxArea(height) {
  // Write your solution here

}

const height = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
console.log(maxArea(height));`,
      PYTHON: `def maxArea(height):
    # Write your solution here
    pass

import sys, json
height = json.loads(sys.stdin.read().strip())
print(maxArea(height))`,
      JAVA: `import java.util.*;

class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here

        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] height = parseIntArray(scanner.nextLine());
        System.out.println(maxArea(height));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}

const height = JSON.parse(require('fs').readFileSync(0, 'utf8').trim());
console.log(maxArea(height));`,
      PYTHON: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_area = max(max_area, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_area

import sys, json
height = json.loads(sys.stdin.read().strip())
print(maxArea(height))`,
      JAVA: `import java.util.*;

class Solution {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int max = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            max = Math.max(max, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] height = parseIntArray(scanner.nextLine());
        System.out.println(maxArea(height));
    }

    private static int[] parseIntArray(String line) {
        line = line.trim();
        if (line.startsWith("[")) line = line.substring(1);
        if (line.endsWith("]")) line = line.substring(0, line.length() - 1);
        line = line.trim();
        if (line.isEmpty()) return new int[0];
        String[] parts = line.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) result[i] = Integer.parseInt(parts[i].trim());
        return result;
    }
}`,
    },
  },
};

const run = async () => {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    console.error(
      "No admin user found — set ADMIN_EMAILS and sign up first, or flip a user's role in Mongo.",
    );
    process.exit(1);
  }

  for (const key of Object.keys(PROBLEMS)) {
    const old = PROBLEMS[key];
    const overrides = STDIN_OVERRIDES[key];

    if (!overrides) {
      console.warn(
        `Skipping "${old.title}" — no stdin-compatible test data defined for "${key}".`,
      );
      continue;
    }

    // examples are just descriptive text shown in the problem statement UI,
    // never fed to a program — kept human-readable, unlike testCases
    const example = old.examples?.[0] || {};

    try {
      await Problem.create({
        title: old.title,
        description: old.description?.text || "",
        difficulty: old.difficulty.toUpperCase(),
        tags: old.category ? old.category.split("•").map((t) => t.trim()) : [],
        constraints: (old.constraints || []).join("\n"),
        testCases: overrides.testCases,
        examples: {
          JAVASCRIPT: example,
          PYTHON: example,
          JAVA: example,
        },
        codeSnippets: overrides.codeSnippets,
        referenceSolutions: overrides.referenceSolutions,
        createdBy: admin._id,
      });

      console.log(`Seeded: ${old.title}`);
    } catch (error) {
      console.error(`Failed to seed "${old.title}":`, error.message);
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
};

run();
